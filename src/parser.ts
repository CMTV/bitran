import { ErrorData, PWError } from "./default";
import { ConfigLike, finalizeConfig } from "./config";
import { Block, Inliner, Product, ProductIds } from "./product";
import { detachMeta, isString, textToStrBlocks } from "./str";
import ParseWorker, { ParseWorkerResult } from "./ParseWorker";
import { Mapped, Typeof } from "./types";
import { Factory } from "./factory";

export class Parser<TConfigLike extends ConfigLike = ConfigLike>
{
    private config: ReturnType<typeof finalizeConfig<TConfigLike>>;

    //

    private workers: Mapped<ParseWorker>;
    private parseResult: ParseResult<typeof this.config.parseWorkers>;

    //

    constructor(config?: TConfigLike)
    {
        this.config = finalizeConfig(config ?? {});
    }

    //

    async parse(text: string): Promise<typeof this.parseResult>
    {
        this.parseResult = new ParseResult;

        this.workers = {};
        for (const [key, ParseWorker] of Object.entries(this.config.parseWorkers))
        {
            const worker = new ParseWorker;
            worker.parser = this;
            this.workers[key] = worker;
        }

        this.parseResult.rootBlocks = await this.parseBlocks(text);

        const pwResults = {};
        for (const [key, parseWorker] of Object.entries(this.workers))
            pwResults[key] = parseWorker.getResult();

        this.parseResult.pwResults = pwResults as any;

        return this.parseResult;
    }

    async parseBlocks(text: string): Promise<ProductIds>
    {
        const blockIds = new ProductIds;

        if (!isString(text))
            return blockIds;

        for (const strBlock of textToStrBlocks(text))
        {
            let block = await this.fabricateBlock(strBlock);
            this.parseResult.products[block.id] = block;
            blockIds.__pids.push(block.id);
        }

        return blockIds;
    }

    async parseInliners(text: string): Promise<ProductIds>
    {
        const inlinerIds = new ProductIds;

        if (!isString(text))
            return inlinerIds;

        let processParts = [text];

        for (const [inlinerName, Factory] of Object.entries(this.config.inliners))
        {
            if (processParts.filter(part => isString(part)).length === 0)
                break;

            let newParts = [];

            const factory = this.prepareFactory(Factory);

            for (const part of processParts)
            {
                if (isString(part))
                {
                    let regexp = new RegExp(factory.regexp);
                    let array: RegExpExecArray;
                    let lastIndex = 0;

                    while ((array = regexp.exec(part)) !== null)
                    {
                        let inliner = new Inliner;
                            inliner.name = inlinerName;

                        if (this.config.keepStr)
                            inliner.str = array[0];

                        try
                        {
                            this.stageParseWorkers('pre', inliner);
                            inliner.data = await factory.fabricateData(array);
                            this.stageParseWorkers('post', inliner);
                        }
                        catch (e)
                        {
                            this.catchError(inliner, array[0], e);
                        }

                        if (array.index > 0)
                            newParts.push(part.slice(lastIndex, array.index));

                        newParts.push(inliner);
                        lastIndex = regexp.lastIndex;
                    }

                    let endingStrPart = part.slice(lastIndex, part.length);
                    if (endingStrPart)
                        newParts.push(endingStrPart); 
                }
                else newParts.push(part);
            }

            processParts = newParts;
        }

        for (const inliner of <Inliner[]><any>processParts)
        {
            this.parseResult.products[inliner.id] = inliner;
            inlinerIds.__pids.push(inliner.id);
        }

        return inlinerIds;
    }

    getContext<TContext = any>()
    {
        return this.config.context as TContext;
    }

    //

    private prepareFactory<T extends Factory>(TFactory: Typeof<T>): T
    {
        const factory = new TFactory;
        factory.parser = this;

        return factory;
    }

    private stageParseWorkers(stage: 'pre' | 'post', product: Product)
    {
        Object
            .values(this.workers)
            .filter(worker => stage === 'pre' ? worker.preFilter(product) : worker.postFilter(product))
            .forEach(worker => stage === 'pre' ? worker.preFabricate(product) : worker.postFabricate(product));
    }

    private catchError(product: Product, str: string, error: any)
    {
        product.data = <ErrorData> {
            name: product.name,
            error: error?.stack ?? error?.toString() ?? error,
        };

        product.name = 'error';
        product.str = str;

        let errorPW = this.workers?.['error'] as PWError;
            errorPW.errorIds.push(product.id);
    }

    private async fabricateBlock(strBlock: string): Promise<Block>
    {
        const parts = detachMeta(strBlock);

        let block = new Block;
            block.meta = parts.meta;

            if (this.config.keepStr)
                block.str = strBlock;

        for (const [blockName, Factory] of Object.entries(this.config.blocks))
        {
            const factory = this.prepareFactory(Factory);

            try
            {
                if (!factory.canFabricate(parts.strBlock, parts.meta))
                    continue;

                block.name = blockName;

                this.stageParseWorkers('pre', block);
                block.data = await factory.fabricateData(parts.strBlock, parts.meta);
                this.stageParseWorkers('post', block);
                break;
            }
            catch (e)
            {
                this.catchError(block, strBlock, e);
                break;
            }
        }

        return block;
    }
}

export class ParseResult<ParseWorkers extends Mapped<Typeof<ParseWorker>>>
{
    products:   { [id: string]: Product };
    rootBlocks: ProductIds;
    pwResults:  { [key in keyof ParseWorkers]: ParseWorkerResult<ParseWorkers[key]> };

    constructor()
    {
        this.products = {};
        this.rootBlocks = new ProductIds;
    }
}