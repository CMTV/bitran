const e={title:'Custom "regexp"-inliner',order:200,config:`import { RegexpInlinerFactory, defineConfig } from 'bitran-parser';

enum LinkTargetType
{
    Relative = 'relative',
    Absolute = 'absolute',
    External = 'external',
}

class Link
{
    type: LinkTargetType;
    label: string;
    target: string;
}

class FLink extends RegexpInlinerFactory<Link>
{
    regexp = /\\[(.+?)\\]\\((.+?)\\)/gm;

    async regexpFabricateData(regexpResult: RegExpExecArray)
    {
        const label = regexpResult[1];
        const target = regexpResult[2];
        
        let type = LinkTargetType.External;
        if (target.startsWith('/')) type = LinkTargetType.Absolute;
        else if (target.startsWith('./')) type = LinkTargetType.Relative;

        const link = new Link;
        link.label = label;
        link.target = target;
        link.type = type;

        return link;
    }
}

export default defineConfig({
    products: {
        link: FLink
    }
});
`,content:`Cats are better than dogs.
It was [proved](./myProof.html) by me!

Dont forget to [subscribe](/member/join.php){ .fancyLink }!

If you have troubles, just [Google](https://google.com) it!
`};export{e as default};
