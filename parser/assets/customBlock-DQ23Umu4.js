const n={title:"Custom block",order:100,config:`//
// By default Bitran treats every block as "Paragraph".
// In this example we will teach it to recognise and parse "Heading" blocks.
// Headings must start with "#", "##", ... symbols just like in Markdown.
//

import { BlockFactory, defineConfig } from 'bitran-parser';

//
// Defining "Heading" block data structure
//

class Heading
{
    level: number; // <h1>, <h2> and etc...
    title: string;
}

//
// Defining factory which converts string block to object block during parsing
//

class FHeading extends BlockFactory<Heading>
{
    regexp = /^(#+) (.+)/;

    // Checking string block and deciding whether it is "Heading" or not
    canFabricate(strBlock: string)
    {
        return this.regexp.test(strBlock);
    }

    // Constructing block data from string block
    async fabricateData(strBlock: string)
    {
        const match = strBlock.match(this.regexp);

        const heading = new Heading;
        heading.level = match[1].length;
        heading.title = match[2];

        return heading;
    }
}

//
// Registering our custom block in Bitran Parser
//

export default defineConfig({
    products: {
        heading: FHeading
    }
});
`,content:`# Level 1. Page header

{ #unique-id .foo .bar +search }
## Level 2. Section

### Level 3. Subsection
`};export{n as default};
