import { type Plugin } from 'vite';

import { readFileSync } from 'fs';
import { globSync } from 'glob';
import YAML from 'yaml';

//
// Constructing examples data
//

export interface ExampleData
{
    id: string;
    title: string;
    order: number;
}

const exampleArr: ExampleData[] = [];

const paths = globSync(`examples/*.yml`, { posix: true });
for (const path of paths)
{
    const id = (path.split('/').pop() as string).replace('.yml', '');

    const exampleFile = YAML.parse(readFileSync(path, { encoding: 'utf-8' }));

    const title = exampleFile.title || id;
    const order = exampleFile.order || Infinity;

    if (!exampleFile.config)
        throw new Error(`Missing 'config' property in '${id}' example!`);

    if (!exampleFile.content)
        throw new Error(`Missing 'content' property in '${id}' example!`);

    exampleArr.push({
        id,
        title,
        order
    });
}

exampleArr.sort((a, b) => a.order - b.order);

//
// Virtual module
//

export default function examples(): Plugin {
    const moduleName = 'virtual:examples';

    return {
        name: moduleName,
        resolveId(id) {
            if (id === moduleName)
                return moduleName;
        },
        load(id) {
            if (id === moduleName)
                return `export default ${JSON.stringify(exampleArr)}`;
        }
    }
}