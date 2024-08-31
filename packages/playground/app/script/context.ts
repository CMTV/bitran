import { useBitran } from "bitran-use";
import { RootNode } from "bitran-dom";
import config from "./config";

export const { parser, stringifier, dom } = useBitran(config.definitions);

export interface ContextItem
{
    id: string;
    code: string;
    root: RootNode;
}

export type ContextItems = Record<string, ContextItem>;

export async function createContextItems(code: string): Promise<ContextItems>
{
    const items: ContextItems = {};

    let id = 'default';
    let cursor = 0;

    const matches = code.matchAll(/^===== (.+) =====$/gm);
    for (const match of matches)
    {
        const whole = match[0];
        const newId = match[1];
        const index = match.index;

        const itemCode = code.slice(cursor, index).trim();

        if (itemCode)
            items[id] = {
                id,
                code: itemCode,
                root: await parser.parse(itemCode),
            }

        id = newId;
        cursor = index + whole.length;
    }

    const finalCode = code.slice(cursor, code.length).trim();

    items[id] = {
        id,
        code: finalCode,
        root: await parser.parse(finalCode),
    }

    return items;
}

export function stringifyContextItems(items: ContextItems)
{
    let str = '';

    for (const [contextId, item] of Object.entries(items))
    {
        if (contextId !== 'default')
            str += `===== ${contextId} =====\n\n`;

        str += stringifier.stringify(item.root);
    }

    str = str.trim();

    return str;
}