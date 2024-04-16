import IBlockMeta from "./IBlockMeta";
import { Parser } from "./parser";
import { skipFirstLine, strToObj } from "./str";

export abstract class Factory<TData = any>
{
    parser: Parser;

    abstract fabricateData(...args: any[]): Promise<TData>;
}

//
// Block Factories
//

export abstract class BlockFactory<TData = any> extends Factory<TData>
{
    abstract canFabricate(strBlock: string, meta: IBlockMeta): boolean;
    abstract fabricateData(strBlock: string, meta: IBlockMeta): Promise<TData>;
}

export abstract class ObjBlockFactory<TData = any, TObj extends Object = any> extends BlockFactory<TData>
{
    abstract objType: string;
    abstract objFabricateData(obj: TObj, meta: IBlockMeta): Promise<TData>;

    canFabricate(strBlock: string)
    {
        let match = strBlock.match(/^@(\S+)$/m);

        if (!match)
            return false;

        return match[1] === this.objType;
    }

    async fabricateData(strBlock: string, meta: IBlockMeta): Promise<TData>
    {
        const strObj = skipFirstLine(strBlock);
        const obj = strToObj(strObj);

        return await this.objFabricateData(obj, meta);
    }
}

//
// Inliner Factories
//

export abstract class InlinerFactory<TData = any> extends Factory<TData>
{
    abstract regexp: RegExp;
    abstract fabricateData(regexpResult: RegExpExecArray): Promise<TData>;
}