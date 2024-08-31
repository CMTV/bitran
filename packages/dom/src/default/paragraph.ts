import { InlinerGroupNode } from "@src/dom/group";
import { Block } from "@src/dom/product";
import { BlockParseFactory, StrFactory } from "@src/factory";

export const paragraphName = '#paragraph';

export class Paragraph extends Block
{
    name = paragraphName;

    content = new InlinerGroupNode(this);

    get children()
    {
        return [this.content];
    }
}

export class ParagraphParser extends BlockParseFactory<Paragraph>
{
    canParse()
    {
        return true;
    }

    async parseProduct(strBlock: string)
    {
        const p = new Paragraph;
        p.content.setNodes(await this.parser.parseInliners(strBlock));
        return p;
    }
}

export class ParagraphStr extends StrFactory<Paragraph>
{
    stringify(product: Paragraph): string
    {
        return this.stringifier.stringify(product.content);
    }
}