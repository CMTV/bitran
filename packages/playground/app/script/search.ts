import { MenuCategory, MenuPlayItem, MenuScene, menu } from "./nav";

export enum SearchState
{
    Empty = 'text-[var(--textShade3)]',
    ContentFound = 'text-[var(--textColor)]',
    ContentNotFound = 'text-red-700 dark:text-red-500',
}

export interface SearchItem
{
    icon:       string;
    path:       string;
    title:      string;
    secondary?: string[];
}

export function search(query: string): SearchItem[]
{
    const results: SearchItem[] = [];

    titles.replace(new RegExp(`^.*${query}.*$`, 'gmi'), (match, index) => {
        results.push(titleItemMap[index]);
        return match;
    });

    return results;
}

//
// Constructing search index
//

let titles = '';
const titleItemMap: Record<string, SearchItem> = {};

for (const menuCategory of Object.values(menu))
{
    for (const menuPlayItem of menuCategory.playItems)
    {
        if (menuPlayItem.scenes.length > 0)
            for (const menuScene of menuPlayItem.scenes)
                createSearchItem(menuCategory, menuPlayItem, menuScene);

        createSearchItem(menuCategory, menuPlayItem);
    }
}

function createSearchItem(category: MenuCategory, playItem: MenuPlayItem, scene: MenuScene = null)
{
    const searchItem: SearchItem = {
        path: scene?.pagePath ?? playItem.pagePath,
        icon: playItem.icon,
        title: scene?.title ?? playItem.title,
        secondary: scene?.title ? [playItem.title] : [],
    }

    titleItemMap[titles.length] = searchItem;
    titles += searchItem.title + '\n';
}