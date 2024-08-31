import { existsSync } from "node:fs";
import { globSync } from "glob";

export interface ScanPlayItem
{
    id:         string;
    configPath: string;
    scenes:     ScanScene[];
}

export interface ScanScene
{
    id:         string;
    metaPath:   string;
    docsPath:   string;
    codePath:   string;
}

export function scan(scanDir: string): ScanPlayItem[]
{
    const items: ScanPlayItem[] = [];

    const existingIds = {};

    const piDirs = globSync('**/{*,}.playItem', {
        cwd: scanDir,
        posix: true
    });

    for (const piDir of piDirs)
    {
        const piId = makePlayItemId(piDir, existingIds);
        existingIds[piId] = null;

        const item: ScanPlayItem = {
            id:         piId,
            configPath: scanDir + '/' + piDir + '/' + 'config.ts',
            scenes:     scanScenes(scanDir + '/' + piDir),
        }

        items.push(item);
    }
    
    return items;
}

//
//
//

function makePlayItemId(piDir: string, existingIds: Record<string, null> = {})
{
    let id = piDir.replace(/\/?\.playItem$/, '').replace(/\//g, '-');

    while (id in existingIds)
        id = '_' + id;

    return id;
}

function scanScenes(scanDir: string): ScanScene[]
{
    const scenes: ScanScene[] = [];

    const sceneDirs = globSync('*.scene', {
        cwd: scanDir,
        posix: true
    });

    for (const sceneDir of sceneDirs)
    {
        const sceneId = sceneDir.replace(/\.scene$/, '');

        const metaPath = scanDir + '/' + sceneDir + '/meta.ts';
        const codePath = scanDir + '/' + sceneDir + '/code.bi';
        const docsPath = scanDir + '/' + sceneDir + '/docs.md';

        const hasMeta = existsSync(metaPath);
        const hasCode = existsSync(codePath);
        const hasDocs = existsSync(docsPath);

        if (!hasCode && !hasDocs)
            throw new Error(`Scene '${scanDir + '/' + sceneDir}' must have at least one of the following: 'code', 'docs'!`);

        const scene: ScanScene = {
            id:         sceneId,
            metaPath:   hasMeta ? metaPath : null,
            codePath:   hasCode ? codePath : null,
            docsPath:   hasDocs ? docsPath : null,
        }

        scenes.push(scene);
    }

    return scenes;
}