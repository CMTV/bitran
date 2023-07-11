export default class BlockMeta
{
    id?: string;
    classes?: string[];
    other?: string[];

    static regexp = /^{(.+)}$/m;

    static createFrom(strBlock: string): BlockMeta
    {
        let match = strBlock.match(BlockMeta.regexp);

        if (!match)
            return null;

        if (match.index !== 0 || match[0] === strBlock)
            return null;

        let parts = match[1].split(' ').map(part => part.trim()).filter(part => part !== '');

        if (parts.length === 0)
            return null;

        let meta = new BlockMeta;
            meta.classes = [];
            meta.other = [];

        parts.forEach(part =>
        {
            if (part.startsWith('#'))
            {
                meta.id = part.slice(1);
                return;
            }

            if (part.startsWith('.'))
            {
                meta.classes.push(part.slice(1));
            }

            meta.other.push(part);
        });

        if (meta.classes.length === 0)  delete meta.classes;
        if (meta.other.length === 0)    delete meta.classes;

        return meta;
    }
}