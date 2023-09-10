import { BlockFactory, InlinerFactory } from "./factory";
import { Block, Inliner } from "./product";

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

export class ErrorBlock extends Block
{
    type = 'errorBlock';
    error: any;
    strBlock: string;
}

export class ErrorInliner extends Inliner
{
    type = 'errorInliner';
    error: any;
    strInliner: string;
}