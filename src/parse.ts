import BlockMeta from "./BlockMeta";
import { FParagraph, FText } from "./default";
import { BlockFactory, InlinerFactory } from "./factory";
import { Block, Inliner } from "./product";
import { reduceSpaceLines, removeCarriageReturns, removeIndent, skipFirstLine, splitToBlocks } from "./util";

export class Parser
{
    blockFactories:     { new (parser: Parser): BlockFactory<Block> }[] = [];
    inlinerFactories:   { new (parser: Parser): InlinerFactory<Inliner> }[] = [];

    parseBlocks(str: string): Block[]
    {
        if (!str)
            return [];

        str = removeCarriageReturns(str);
        str = reduceSpaceLines(str);
        str = removeIndent(str);

        return splitToBlocks(str).map(strBlock => this.parseBlock(strBlock));
    }

    parseBlock(strBlock: string): Block
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
                return blockFactory.parse(strBlock, meta);
        }

        return new FParagraph(this).parse(strBlock);
    }

    parseInliners(str: string): Inliner[]
    {
        let results = [str];

        [...this.inlinerFactories, FText].forEach(TInlinerFactory =>
        {
            let inlinerFactory = new TInlinerFactory(this);
            let newResults = [];

            results.forEach(resultItem =>
            {
                if (typeof resultItem === 'string')
                    newResults.push(...inlinerFactory.splitParse(resultItem));
                else
                    newResults.push(resultItem);
            });

            results = newResults;
        });

        return results as any as Inliner[];
    }
}