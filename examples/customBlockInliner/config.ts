import { BlockFactory, IBlockMeta, ProductIds, ObjBlockFactory, Inliner, InlinerFactory, ConfigLike } from "bitran";

//
// Parsing Markdown "###"-like headers
//

class Heading
{
    level: number;
    title: string;
}

class FHeading extends BlockFactory<Heading>
{
    regexp = /^(#+) (.+)/;

    canFabricate(strBlock: string): boolean
    {
        return this.regexp.test(strBlock);
    }

    async fabricateData(strBlock: string, meta: IBlockMeta)
    {
        let match = strBlock.match(this.regexp);

        let heading = new Heading;
            heading.level = match[1].length;
            heading.title = match[2];

        return heading;
    }
}

//
// Parsing quotes
//

class Quote
{
    author: string;
    content: ProductIds;
}

class FQuote extends ObjBlockFactory<Quote>
{
    objType = 'quote';

    async objFabricateData(obj: any, meta: IBlockMeta)
    {
        let quote = new Quote;
            quote.author = obj.author ?? 'Unknown author';

        if (!obj.content)
            throw new Error('Missing quote content!');

        quote.content = await this.parser.parseBlocks(obj.content);

        return quote;
    }
}

//
// Parsing Markdown "* ... *"-like italic text fragments
//

type Italic = ProductIds;

class FItalic extends InlinerFactory<Italic>
{
    regexp = /\*(.+?)\*/gm;

    async fabricateData(regexpResult: RegExpExecArray)
    {
        return this.parser.parseInliners(regexpResult[1]);
    }
}

//
//
//

export default <ConfigLike> {
    blocks: {
        heading:    FHeading,
        quote:      FQuote,
    },
    inliners: {
        italic:     FItalic,
    }
}