import { BlockFactory, InlinerFactory } from "./factory";
import { Block, Inliner, Product } from "./product";

//
// Default block: Paragraph
//

export class Paragraph extends Block
{
    type = 'paragraph';
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
    type = 'text';
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
// Error block and inliner
//

export abstract class ErrorProduct extends Product
{
    error: Error;
    code?: string;
}

export class ErrorBlock extends ErrorProduct
{
    type = 'errorBlock';
}

export class ErrorInliner extends ErrorProduct
{
    type = 'errorInliner';
}