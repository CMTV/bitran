import YAML from "yaml";

import BlockMeta from "./BlockMeta";
import { Parser } from "./parse";
import { Block, Inliner, Product } from "./product";
import { skipFirstLine } from "./util";

export abstract class Factory<TProduct extends Product>
{
    parser: Parser;

    constructor(parser: Parser)
    {
        this.parser = parser;
    }

    abstract parse(...args: any[]): TProduct;
}

//
// Block Factories
//

export abstract class BlockFactory<TBlock extends Block> extends Factory<TBlock>
{
    abstract canParse(strBlock: string): boolean;
    abstract parse(strBlock: string, meta: BlockMeta): TBlock;
}

export abstract class ObjBlockFactory<TBlock extends Block, TObj extends object = {}> extends BlockFactory<TBlock>
{
    abstract objType: string;
    abstract parseObj(obj: TObj, meta: BlockMeta): TBlock;

    canParse(strBlock: string)
    {
        return strBlock.startsWith('@' + this.objType);
    }

    parse(strBlock: string, meta: BlockMeta)
    {
        return this.parseObj(YAML.parse(skipFirstLine(strBlock)), meta);
    }
}

//
// Inliner Factories
//

export abstract class InlinerFactory<TInliner extends Inliner> extends Factory<Inliner>
{
    abstract regexp: RegExp;
    abstract parse(match: RegExpExecArray): TInliner;

    splitParse(str: string): (string | TInliner)[]
    {
        let results = [];
        let regexp = new RegExp(this.regexp);

        let match: RegExpExecArray;
        let lastIndex = 0;
        while ((match = regexp.exec(str)) !== null)
        {
            let strFragment = str.slice(lastIndex, match.index);
            if (strFragment)
                results.push(strFragment);

            results.push(this.parse(match));

            lastIndex = match.index + match[0].length;
        }

        let lastStrFragment = str.slice(lastIndex, str.length);
        if (lastStrFragment)
            results.push(lastStrFragment);

        return results;
    }
}