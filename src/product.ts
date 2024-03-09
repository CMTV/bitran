export abstract class Product
{
    abstract __type: ProductType;
    abstract __name: string;
}

export enum ProductType
{
    Block = 'block',
    Inliner = 'inliner',
}

export abstract class Block extends Product
{
    __type = ProductType.Block;
}

export abstract class Inliner extends Product
{
    __type = ProductType.Inliner;
}