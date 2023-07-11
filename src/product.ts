export abstract class Product
{
    abstract type: string;
}

export abstract class Block extends Product {}
export abstract class Inliner extends Product {}