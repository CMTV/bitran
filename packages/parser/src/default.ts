import { BlockFactory, InlinerFactory, InlinerSplitData } from "./factory";
import { ParseStage } from "./parser";
import { Product, ProductIds } from "./product";
import { ParseWorker } from "./worker";

//
// Default block: Paragraph
//

export class FParagraph extends BlockFactory<ProductIds>
{
    canFabricate() { return true; }

    async fabricateData(strBlock: string)
    {
        return this.process.parseInliners(strBlock);
    }
}

//
// Default inliner: Text
//

export class FText extends InlinerFactory<string>
{
    async split(strBlock: string)
    {
        return {
            parts: [strBlock],
            toParseIndexes: [0]
        };
    }

    async fabricateData(strInliner: string)
    {
        return strInliner;
    }
}

//
// Generic inliner group (aka <span> in HTML)
//

export class FSpan extends InlinerFactory<ProductIds>
{
    private startDelim = '<<';
    private endDelim = '>>';

    async split(strBlock: string)
    {
        const result = new InlinerSplitData;

        let regexp = new RegExp(`${this.startDelim}|${this.endDelim}`, 'g');
        let openCount = 0;
        let cursor = 0;

        for (const match of strBlock.matchAll(regexp))
        {
            const offset = match.index;
            const openMatch = match[0] === this.startDelim;

            // Just random closing delimiter out of nowhere
            if (openCount === 0 && !openMatch)
                continue;

            // Opening span group
            if (openMatch)
            {
                // Opened "root"-level span group
                if (openCount === 0)
                {
                    let beforeGroupText = strBlock.slice(cursor, offset);
                    if (beforeGroupText)
                        result.parts.push(beforeGroupText);

                    cursor = offset + this.startDelim.length;
                }

                openCount++;
            }

            // Closing span group
            if (!openMatch)
            {
                openCount--;

                // Closed "root"-level span group
                if (openCount === 0)
                {
                    const toParseIndex = result.parts.push(strBlock.slice(cursor, offset)) - 1;
                    result.toParseIndexes.push(toParseIndex);
                    cursor = offset + this.endDelim.length;
                }
            }
        }

        let endingStrPart = strBlock.slice(cursor, strBlock.length);
        if (openCount > 0)
            endingStrPart = result.parts.pop() + endingStrPart; // Have unclosed group, join the rest of string with previous saved string part

        if (endingStrPart)
            result.parts.push(endingStrPart);

        return result;
    }

    async fabricateData(strInliner: string)
    {
        return this.process.parseInliners(strInliner);
    }
}

//
// Custom Product Data: Error
//

export class ErrorData
{
    name: string;
    error: string;
}

//
// Id Parse Worker
//

export class PWId extends ParseWorker
{
    typeCounter: { [type: string]: number } = {};
    uniques: { [uniqueId: string]: null } = {};

    getNameOrder(name: string)
    {
        if (!this.typeCounter[name])
            this.typeCounter[name] = 0;

        return ++this.typeCounter[name];
    }

    filter(stage: ParseStage)
    {
        return stage === ParseStage.Pre;
    }

    fabricate(stage: ParseStage, product: Product<any>)
    {
        product.id = 'auto:' + product.name + ':' + this.getNameOrder(product.name);
        
        if (product?.meta?.id)
        {
            let id = product.name + ':' + product.meta.id;

            if (id in this.uniques)
                throw new Error(`Duplicate unique product ID '${id}'!`);

            product.id = id;
            this.uniques[id] = null;
        }
    }

    getResult()
    {
        return Object.keys(this.uniques);
    }
}

//
// Error Parse Worker
//

export class PWError extends ParseWorker
{
    errorIds: string[] = [];

    getResult()
    {
        return this.errorIds;
    }
}