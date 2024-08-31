import { Inliner } from "@src/dom/product";
import { StrFactory } from "@src/factory";

export const textName = '#text';

export class Text extends Inliner
{
    name = '#text';
    content: string;

    get children() { return []; }
}

export class TextStr extends StrFactory<Text>
{
    stringify(product: Text)
    {
        return product.content ?? '';
    }
}