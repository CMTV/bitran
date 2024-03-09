import { BlockFactory, InlinerFactory } from "./factory";
import { Block, Inliner, Product, ProductType } from "./product";

//
// Default block: Paragraph
//

export class Paragraph extends Block
{
    __name = 'paragraph';
    content: Inliner[];
}

export class FParagraph extends BlockFactory<Paragraph>
{
    canParse()
    {
        return true;
    }

    async parse(str: string)
    {
        let paragraph = new Paragraph;
            paragraph.content = await this.parser.parseInliners(str);
        
        return paragraph;
    }
}

//
// Default inliner: Text
//

export class Text extends Inliner
{
    __name = 'text';
    content: string;
}

export class FText extends InlinerFactory<Text>
{
    regexp = /.+/gm;

    async parse(match: RegExpExecArray)
    {
        let text = new Text;
            text.content = match[0];

        return text;
    }
}

//
// Error
//

export abstract class ErrorProduct extends Product
{
    __name = 'error';
    error:  Error;
    raw:    string;
}

export class ErrorBlock extends ErrorProduct
{
    __type = ProductType.Block;
}

export class ErrorInliner extends ErrorProduct
{
    __type = ProductType.Inliner;
}