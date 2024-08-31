import { Block } from 'bitran-dom';
import { type RawPlayItem } from 'src';
import { type ContentScene } from 'src/cli/plugin/content';

import CONTENT from 'virtual:content';

//
// Types
//

export type ResolvedPlayItem = {
    id:         string;
    category:   string;
    title:      string;
    icon:       string;
    scenes:     Record<string, ResolvedScene>;
}

export type ResolvedScene = {
    id:         string;
    title:      string;
    order:      number;
    loadData:   ContentScene['loadData'];
}

//
// Export
//

export const playItems: Record<string, ResolvedPlayItem> = {};

//
// Resolving
//

for (const [playItemId, contentPlayItem] of Object.entries(CONTENT))
{
    const playItem = <ResolvedPlayItem> {};

    playItem.id = playItemId;
    resolveRawPlayItem(contentPlayItem.rawPlayItem, playItem);

    let fallbackOrder = 0;
    playItem.scenes = {};
    for (const [sceneId, contentScene] of Object.entries(contentPlayItem.scenes))
        playItem.scenes[sceneId] = resolveScene(contentScene, ++fallbackOrder);

    playItems[playItemId] = playItem;
}

function resolveRawPlayItem(rawPlayItem: RawPlayItem, playItem: ResolvedPlayItem)
{
    if (rawPlayItem.type === 'node')
    {
        // Bitran node play item
        const definition =  rawPlayItem.definition;
        playItem.category = definition.Node.prototype instanceof Block ? 'block' : 'inliner';
        playItem.icon =     definition.renderer.icon;
        playItem.title =    rawPlayItem.title;
    }
    else
    {
        // Custom play item
        playItem.title    = rawPlayItem.title;
        playItem.category = rawPlayItem.category || '';
        playItem.icon     = rawPlayItem.icon || 'missing';
    }
}

function resolveScene(contentScene: ContentScene, fallbackOrder: number): ResolvedScene
{
    const scene: ResolvedScene = {
        id:         contentScene.id,
        title:      contentScene.meta?.title || contentScene.id,
        order:      contentScene.meta?.order ?? fallbackOrder,
        loadData:   contentScene.loadData,
    }

    return scene;
}