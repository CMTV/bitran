import BlockMeta from "./BlockMeta";
import { ErrorBlock, FParagraph, FText } from "./default";
import { BlockFactory, InlinerFactory } from "./factory";
import { Block, Inliner } from "./product";
import { reduceSpaceLines, removeCarriageReturns, removeIndent, skipFirstLine, splitToBlocks } from "./util";

export class Parser
{
    blockFactories:     { new (parser: Parser): BlockFactory<Block> }[] = [];
    inlinerFactories:   { new (parser: Parser): InlinerFactory<Inliner> }[] = [];

    onBlockParsed: (block: Block, meta: BlockMeta, factory: BlockFactory<Block>) => Block | void;
    onInlinerParsed: (inliner: Inliner, factory: InlinerFactory<Inliner>) => Inliner | void;

    async parseBlocks(str: string): Promise<Block[]>
    {
        if (!str)
            return [];

        str = removeCarriageReturns(str);
        str = reduceSpaceLines(str);
        str = removeIndent(str);

        return await Promise.all(splitToBlocks(str).map(async strBlock => await this.parseBlock(strBlock)));
    }

    async parseBlock(strBlock: string): Promise<Block>
    {
        try 
        {
            let meta = BlockMeta.createFrom(strBlock);

            if (meta)
                strBlock = skipFirstLine(strBlock);
    
            let blockFactories = [...this.blockFactories, FParagraph];
    
            for (let i = 0; i < blockFactories.length; i++)
            {
                let TBlockFactory = blockFactories[i];
                let blockFactory = new TBlockFactory(this);
    
                if (blockFactory.canParse(strBlock))
                {
                    let block = await blockFactory.parse(strBlock, meta);
    
                    if (this.onBlockParsed)
                    {
                        let onResult = this.onBlockParsed(block, meta, blockFactory);
                        if (typeof onResult !== 'undefined')
                            block = onResult;
                    }
    
                    return block;
                }
            }
    
            return new FParagraph(this).parse(strBlock);
        }
        catch (e)
        {
            let errorBlock = new ErrorBlock;
                errorBlock.error = e;
                errorBlock.strBlock = strBlock;

            return errorBlock;
        }
    }

    async parseInliners(str: string): Promise<Inliner[]>
    {
        let results = [str];

        for (let TInlinerFactory of [...this.inlinerFactories, FText])
        {
            let inlinerFactory = new TInlinerFactory(this);
            let newResults = [];

            for (let resultItem of results)
            {
                if (typeof resultItem === 'string')
                    newResults.push(...(await inlinerFactory.splitParse(resultItem, this.onInlinerParsed)));
                else
                    newResults.push(resultItem);
            }

            results = newResults;
        }

        return results as any as Inliner[];
    }
}