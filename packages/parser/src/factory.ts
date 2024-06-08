import { ParseProcess } from './parser';
import { ProductMeta, ProductType } from './product';
import { skipFirstLine, strToObj } from './str';

export abstract class Factory<TData = any>
{
    static pType: ProductType;
    process: ParseProcess;
    abstract fabricateData(...args: any[]): Promise<TData>;
}

//
// Block Factories
//

export abstract class BlockFactory<TData = any> extends Factory<TData>
{
    static pType = ProductType.Block;
    abstract canFabricate(strBlock: string, meta: ProductMeta): boolean;
    abstract fabricateData(strBlock: string, meta: ProductMeta): Promise<TData>;
}

export abstract class ObjBlockFactory<TData = any, TObj extends Object = any> extends BlockFactory<TData>
{
    abstract objType: string;
    abstract objFabricateData(obj: TObj, meta: ProductMeta): Promise<TData>;

    canFabricate(strBlock: string)
    {
        const match = strBlock.match(/^@(\S+)$/m);
        return match?.[1] === this.objType;
    }

    async fabricateData(strBlock: string, meta: ProductMeta)
    {
        const strObj = skipFirstLine(strBlock);
        const obj = strToObj(strObj);

        return await this.objFabricateData(obj, meta);
    }
}

//
// Inliner Factories
//

export class InlinerSplitData
{
    parts: string[] = [];
    toParseIndexes: number[] = [];
}

export abstract class InlinerFactory<TData = any> extends Factory<TData>
{
    static pType = ProductType.Inliner;
    abstract fabricateData(strInliner: string, meta: ProductMeta): Promise<TData>;
    abstract split(strBlock: string): Promise<InlinerSplitData>;
}

export abstract class RegexpInlinerFactory<TData = any> extends InlinerFactory<TData>
{
    abstract regexp: RegExp;
    abstract regexpFabricateData(regexpResult: RegExpExecArray, meta: ProductMeta): Promise<TData>;

    async split(text: string)
    {
        const result = new InlinerSplitData;

        let regexp = new RegExp(this.regexp);
        let array: RegExpExecArray;
        let lastIndex = 0;

        while ((array = regexp.exec(text)) !== null)
        {
            if (array.index > 0)
                result.parts.push(text.slice(lastIndex, array.index));

            const toParseIndex = result.parts.push(array[0]) - 1;
            result.toParseIndexes.push(toParseIndex);

            lastIndex = regexp.lastIndex;
        }

        let endingStrPart = text.slice(lastIndex, text.length);
        if (endingStrPart)
            result.parts.push(endingStrPart);

        return result;
    }

    async fabricateData(strInliner: string, meta: ProductMeta): Promise<TData>
    {
        return this.regexpFabricateData(new RegExp(this.regexp).exec(strInliner), meta);
    }
}