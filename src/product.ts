import IBlockMeta from "./IBlockMeta";

export enum ProductType
{
    Block = 'block',
    Inliner = 'inliner',
}

export abstract class Product<TData = any>
{
    abstract type:  ProductType;
    
    id:     string;
    name:   string;
    data:   TData;
    str:    string;
}

export class Block<TData = any> extends Product<TData>
{
    type = ProductType.Block;

    meta:   IBlockMeta;
}

export class Inliner<TData = any> extends Product<TData>
{
    type = ProductType.Inliner;
}

export class ProductIds
{
    __pids: string[] = [];

    // Context ?

    static getIds(productIds: ProductIds)
    {
        return productIds.__pids;
    }
}