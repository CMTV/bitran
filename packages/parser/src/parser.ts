import { Config } from "./config";
import { ErrorData, PWError } from "./default";
import { BlockFactory, Factory, InlinerFactory } from "./factory";
import { Block, Inliner, Product, ProductIds, ProductType } from "./product";
import { detachMeta, isString, parseInlineMeta, textToStrBlocks } from "./str";
import { ParseWorker } from "./worker";

export enum ParseStage
{
    Pre = 'pre',
    Post = 'post',
}

export class Parser<TConfig extends Config = Config>
{
    private config:     TConfig;
    private blocks:     { [blockName: string]: new () => BlockFactory };
    private inliners:   { [inlinerName: string]: new () => InlinerFactory };

    constructor(config: TConfig)
    {
        this.config = config;
        this.blocks = {};
        this.inliners = {};

        for (const [productName, Factory] of Object.entries(config.products))
        {
            // @ts-ignore
            this[Factory.pType === ProductType.Block ? 'blocks' : 'inliners'][productName] = Factory;
        }
    }

    async parse(text: string): Promise<ParseResult<TConfig>>
    {
        const parseProcess = new ParseProcess(
            this.config,
            this.blocks,
            this.inliners,
        );

        return parseProcess['parse'](text) as any;
    }
}

export class ParseProcess
{
    private config:     Config;
    private blocks:     { [blockName: string]: new () => BlockFactory };
    private inliners:   { [inlinerName: string]: new () => InlinerFactory };

    private workers:    { [workerName: string]: ParseWorker };

    private result: ParseResult;

    constructor(config, blocks, inliners)
    {
        this.config =   {...config};
        this.blocks =   {...blocks};
        this.inliners = {...inliners};
    }

    private async parse(text: string): Promise<ParseResult>
    {
        this.result = new ParseResult;

        this.workers = {};
        for (const [workerName, ParseWorker] of Object.entries(this.config.workers))
        {
            const worker = new ParseWorker;
            worker.process = this;
            this.workers[workerName] = worker;
        }

        this.result.rootProducts = await this.parseBlocks(text);

        this.result.workerResults = {};
        for (const [workerName, parseWorker] of Object.entries(this.workers))
            this.result.workerResults[workerName] = parseWorker.getResult();

        return this.result;
    }

    async parseBlocks(text: string): Promise<ProductIds>
    {
        const blockIds = new ProductIds;

        if (!isString(text))
            return blockIds;

        for (const strBlock of textToStrBlocks(text))
        {
            const block = await this.fabricateBlock(strBlock);
            this.result.products[block.id] = block;
            blockIds._pids.push(block.id);
        }

        return blockIds;
    }

    async parseInliners(text: string): Promise<ProductIds>
    {
        const inlinerIds = new ProductIds;

        if (!isString(text))
            return inlinerIds;

        let parts = [text];

        for (const [inlinerName, Factory] of Object.entries(this.inliners))
        {
            let newParts = [];
            const factory = this.prepareFactory(Factory);

            for (const part of parts)
            {
                if (part === null)
                    continue; // This part was previously used as meta

                if (!isString(part))
                {
                    newParts.push(part);
                    continue; // Inliner already
                }

                const splitData = await factory.split(part);
                for (let i = 0; i < splitData.parts.length; i++)
                {
                    const splitPart = splitData.parts[i];
                    if (!splitData.toParseIndexes.includes(i))
                    {
                        newParts.push(splitPart); // This factory can't make inliners from this part so we skip it
                        continue;
                    }

                    const inliner = new Inliner;
                    inliner.name = inlinerName;

                    if (this.config.keepStr)
                        inliner.str = splitPart;

                    let meta = undefined;
                    if (typeof splitData.parts[i+1] === 'string' && !splitData.toParseIndexes.includes(i+1))
                    {
                        let nextPart = splitData.parts[i+1];
                        nextPart = nextPart.replace(/^{(.+)}/, (match, inlineMeta) => {
                            meta = parseInlineMeta(inlineMeta);
                            return '';
                        });

                        splitData.parts[i+1] = nextPart || null; // Updating next part or even setting it to null to skip it in next iteration
                    }
                    inliner.meta = meta;

                    try
                    {
                        this.stageParseWorkers(ParseStage.Pre, inliner);

                        inliner.data = await factory.fabricateData(splitPart, meta);
                        if (inliner.data === undefined)
                            throw new Error(`Returning 'undefined' during inliner data fabrication is not allowed!`);

                        this.stageParseWorkers(ParseStage.Post, inliner);
                    }
                    catch (e)
                    {
                        this.handleError(inliner, splitPart, e);
                    }
                    finally { newParts.push(inliner); }
                }
            }

            parts = newParts;
        }

        for (const inliner of <Inliner[]><any>parts)
        {
            this.result.products[inliner.id] = inliner;
            inlinerIds._pids.push(inliner.id);
        }

        return inlinerIds;
    }

    //
    //
    //

    private async fabricateBlock(strBlock: string): Promise<Block>
    {
        const parts = detachMeta(strBlock);

        const block = new Block;
        block.meta = parts.meta;

        if (this.config.keepStr)
            block.str = strBlock;

        for (const [blockName, Factory] of Object.entries(this.blocks))
        {
            const factory = this.prepareFactory(Factory);

            try
            {
                if (!factory.canFabricate(parts.strBlock, parts.meta))
                    continue;

                block.name = blockName;

                this.stageParseWorkers(ParseStage.Pre, block);

                block.data = await factory.fabricateData(parts.strBlock, parts.meta);
                if (block.data === undefined)
                    throw new Error(`Returning 'undefined' during block data fabrication is not allowed!`);

                this.stageParseWorkers(ParseStage.Post, block);
                break;
            }
            catch (e)
            {
                this.handleError(block, strBlock, e);
                break;
            }
        }

        return block;
    }

    private prepareFactory<T extends Factory>(TFactory: new () => T): T
    {
        const factory = new TFactory;
        factory.process = this;
        return factory;
    }

    private stageParseWorkers(stage: ParseStage, product: Product)
    {
        for (const worker of Object.values(this.workers))
        {
            if (worker.filter(stage, product))
                worker.fabricate(stage, product);
        }
    }

    private handleError(product: Product, str: string, error: any)
    {
        product.data = <ErrorData> {
            name: product.name,
            str,
            error: error?.stack ?? error?.toString() ?? error,
        }

        product.name = 'error';

        (this.workers?.['error'] as PWError)?.errorIds?.push(product.id);
    }

    //
    //
    //

    getContext<TContext = any>()
    {
        return this.config.context as TContext;
    }
}

export class ParseResult<TConfig extends Config = Config>
{
    workerResults:  { [workerName in keyof TConfig['workers'] ]: ReturnType<InstanceType<TConfig['workers'][workerName]>['getResult']> }
    rootProducts:   ProductIds;
    products:       { [productId: string]: Product } = {};
}