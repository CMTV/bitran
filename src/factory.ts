import YAML from "yaml";

import BlockMeta from "./BlockMeta";
import { Parser } from "./parse";
import { Block, Inliner, Product } from "./product";
import { skipFirstLine } from "./util";
import { ErrorInliner } from "./default";

export abstract class Factory<TProduct extends Product>
{
    parser: Parser;

    constructor(parser: Parser)
    {
        this.parser = parser;
    }

    abstract parse(...args: any[]): Promise<TProduct>;
}

//
// Block Factories
//

export abstract class BlockFactory<TBlock extends Block> extends Factory<TBlock>
{
    abstract canParse(strBlock: string): boolean;
    abstract parse(strBlock: string, meta: BlockMeta): Promise<TBlock>;
}

export abstract class ObjBlockFactory<TBlock extends Block, TObj extends object = any> extends BlockFactory<TBlock>
{
    abstract objType: string;
    abstract parseObj(obj: TObj, meta: BlockMeta): Promise<TBlock>;

    canParse(strBlock: string)
    {
        return strBlock.startsWith('@' + this.objType);
    }

    async parse(strBlock: string, meta: BlockMeta)
    {
        let strObject = skipFirstLine(strBlock);
        let obj = strObject ? YAML.parse(strObject) : {};

        return await this.parseObj(obj, meta);
    }
}

//
// Inliner Factories
//

export abstract class InlinerFactory<TInliner extends Inliner> extends Factory<Inliner>
{
    abstract regexp: RegExp;
    abstract parse(match: RegExpExecArray, rawStr: string): Promise<TInliner>;

    async splitParse(str: string, onInlinerParsed: any = null, onParseError: any = null): Promise<(string | TInliner)[]>
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

            let inliner;

            try
            {
                inliner = await this.parse(match, match[0]);
            }
            catch (e)
            {
                let errorInliner = new ErrorInliner;
                    errorInliner.error = e;
                    errorInliner.raw = match[0];
                
                if (onParseError)
                    onParseError(errorInliner, this);

                inliner = errorInliner;
            }

            if (onInlinerParsed)
            {
                let onResult = onInlinerParsed(inliner, this);
                if (typeof onResult !== 'undefined')
                    inliner = onResult;
            }

            results.push(inliner);

            lastIndex = match.index + match[0].length;
        }

        let lastStrFragment = str.slice(lastIndex, str.length);
        if (lastStrFragment)
            results.push(lastStrFragment);

        return results;
    }
}