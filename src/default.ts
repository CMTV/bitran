import ParseWorker from "./ParseWorker";
import { BlockFactory, InlinerFactory } from "./factory";
import { Block, Product, ProductIds, ProductType } from "./product";
import { Mapped } from "./types";

//
// Default block: Paragraph
//

export type Paragraph = ProductIds;

export class FParagraph extends BlockFactory<Paragraph>
{
    canFabricate()
    {
        return true;
    }

    async fabricateData(strBlock: string)
    {
        return this.parser.parseInliners(strBlock);
    }
}

//
// Default inliner: Text
//

export class FText extends InlinerFactory<string>
{
    regexp = /[\s\S]+/gm;

    async fabricateData(regexpResult: RegExpExecArray)
    {
        return regexpResult[0];
    }
}

//
// Error
//

export class ErrorData
{
    name:   string;
    error:  string;
}

//
// Id Parse Worker
//

export class PWId extends ParseWorker
{
    typeCounter: { [type: string]: number } = {};
    uniques: Mapped<null> = {};

    getNameOrder(name: string)
    {
        if (!this.typeCounter[name])
            this.typeCounter[name] = 0;

        return ++this.typeCounter[name];
    }

    //

    preFilter()
    {
        return true;
    }

    preFabricate(product: Product)
    {
        product.id = 'auto:' + product.name + ':' + this.getNameOrder(product.name);

        if (product.type === ProductType.Block)
        {
            let block = product as Block;
        
            if (block.meta.id)
            {
                let id = block.name + ':' + block.meta.id;

                if (id in this.uniques)
                    throw new Error(`Duplicate unique block id '${id}'!`);

                block.id = id;
                this.uniques[id] = null;
            }
        }
    }

    getResult()
    {
        return Object.keys(this.uniques);
    }
}

export class PWError extends ParseWorker
{
    errorIds: string[] = [];

    getResult()
    {
        return this.errorIds;
    }
}