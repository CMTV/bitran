import { markRaw } from "vue";

import { type Page } from "@app/store/page";
import { playItems } from "./resolvedContent";

export const pages: Record<string, Page> = {};

//
// Menu related stuff
//

export interface MenuCategory
{
    title?:     string;
    playItems:  MenuPlayItem[];
}

export interface MenuPlayItem
{
    id:         string;
    icon:       string;
    title:      string;
    pagePath:   string;
    scenes:     MenuScene[];
}

export interface MenuScene
{
    id:         string;
    title:      string;
    pagePath:   string;
}

export type TMenuItem = MenuPlayItem | MenuScene;

export const menu: Record<string, MenuCategory> = {
    '': {
        playItems: []
    },
    'tutorial': {
        title: 'Tutorials',
        playItems: []
    },
    'block': {
        title: 'Blocks',
        playItems: []
    },
    'inliner': {
        title: 'Inliners',
        playItems: []
    }
};

// !
// ! Construct nav pages and menu
// !

for (const playItem of Object.values(playItems))
{
    if (playItem.category in menu)
    {
        menu[playItem.category].playItems.push(<MenuPlayItem> {
            id:         playItem.id,
            icon:       playItem.icon,
            title:      playItem.title,
            scenes:     []
        });
    }

    for (const scene of Object.values(playItem.scenes).sort((a, b) => a.order - b.order))
    {
        const pagePath = `${playItem.id}--${scene.id}`;
        const menuItem = menu[playItem.category].playItems.at(-1);

        menuItem.scenes.push({
            id:         scene.id,
            title:      scene.title,
            pagePath:   pagePath
        });

        menuItem.pagePath = menuItem.pagePath ?? pagePath; // Setup default scene for menu item

        //
        // Page setup
        //

        pages[`${playItem.id}--${scene.id}`] = {
            path: pagePath,
            playItem,
            scene,
        }
    }
}

//
// Playground
//

pages[''] = {
    path:       '',
    playItem: {
        id: '',
        category: '',
        icon: 'play',
        title: 'Playground',
        scenes: {},
    },
    scene: {
        id: '',
        order: 0,
        title: '',
        loadData: () => new Promise(async resolve => {
            resolve({
                code: (await import('@app/playground/code.bi?raw')).default,
                docs: markRaw((await import('@app/playground/docs.md')).default),
            })
        })
    }
};

menu[''].playItems.unshift({
    id:         '',
    icon:       'play',
    title:      'Playground',
    pagePath:   '',
    scenes: []
});