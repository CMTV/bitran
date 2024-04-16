import fs from 'node:fs';
import { Parser } from 'bitran';

const exampleDirs = fs.readdirSync('examples', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

for (const dir of exampleDirs)
{
    const text = fs.readFileSync('examples/' + dir + '/text.txt', { encoding: 'utf-8' });
    const config = (await import('./' + dir + '/config.ts')).default;
    const parser = new Parser(config);

    fs.writeFileSync('examples/' + dir + '/result.json', JSON.stringify(await parser.parse(text), null, 4), { encoding: 'utf-8' });
}