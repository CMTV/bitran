export enum ProductType
{
    Block = 'block',
    Inliner = 'inliner',
}

export interface ProductMeta
{
    id?: string;
    classes?: string[];
    [key: string]: any;
}

export abstract class Product<TData = any>
{
    abstract type: ProductType;

    id: string;
    name: string;
    meta?: ProductMeta;
    str?: string;
    data: TData;
}

export class Block<TData = any> extends Product<TData>
{
    type = ProductType.Block;
}

export class Inliner<TData = any> extends Product<TData>
{
    type = ProductType.Inliner;
}

export class ProductIds
{
    _pids: string[] = [];

    static get(productIds: ProductIds)
    {
        return productIds._pids;
    }
}
