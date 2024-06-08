import YAML from 'yaml';
import { ProductMeta } from './product';

export function textToStrBlocks(text: string): string[]
{
    text += '\n\n'; // "Magic" newlines to ensure last block `\n` is trimmed
    return text.split(/\n^\s*\n(?! |\n|})/gm).filter(strBlock => !!strBlock);
}

export function isString(toCheck: any)
{
    return typeof toCheck === 'string';
}

export function strToObj(strObj: string)
{
    if (!strObj.trim())
        return {};

    const obj = YAML.parse(strObj);

    if (!obj || obj.constructor.name !== "Object")
        throw new Error(`Expected a literal object after 'YAML.parse()'!\nReceived:\n\n${obj}`);

    return obj;
}

//
// First line
//

export function splitByFirstLine(text: string)
{
    const newlineIndex = text.indexOf('\n');
    const hasNewLine = newlineIndex !== -1;

    return {
        first:  hasNewLine ? text.substring(0, newlineIndex) : text,
        rest:   hasNewLine ? text.substring(newlineIndex + 1) : '',
    }
}

export function getFirstLine(text: string)
{
    return splitByFirstLine(text).first;
}

export function skipFirstLine(text: string)
{
    return splitByFirstLine(text).rest;
}

//
// Meta
//

export function detachMeta(metaText: string): { meta: undefined | object, strBlock: string }
{
    let meta = undefined;

    metaText = metaText.replace(/^{(.*)}$|^{([\s\S]*?)^}$/m, (match, inlineMeta, blockMeta, offset) =>
    {
        if (offset > 0 || match.length === metaText.length)
            return match;

        meta = parseBlockMeta(inlineMeta ?? blockMeta);
        return '';
    });

    metaText = metaText.trim();

    return {
        meta,
        strBlock: metaText
    }
}

export function parseInlineMeta(strInlineMeta: string): ProductMeta
{
    let classes: string[] = [];
    let id = '';
    let fastProps = {};

    for (const term of strInlineMeta.trim().split(/\s+/gm))
    {
        const firstSymbol = term.at(0);
        const rest = term.substring(1);

        switch (firstSymbol)
        {
            case '#':
                id = rest;
                break;

            case '.':
                classes.push(rest);
                break;

            case '+':
                fastProps[rest] = true;
                break;

            case '-':
                fastProps[rest] = false;
                break;

            default:
                const parts = term.split('=');
                fastProps[parts.shift()] = parts.pop() ?? null;
                break;
        }
    }

    const meta = <ProductMeta> {
        id: id || undefined,
        classes: classes.length > 0 ? classes : undefined,
        ...fastProps
    }

    Object.keys(meta).map(k => meta[k] === undefined ? delete meta[k] : false);

    return meta;
}

export function parseBlockMeta(strBlockMeta: string): ProductMeta
{
    const strParts = splitByFirstLine(strBlockMeta.trim())

    if (/^(\s*[#.+-]\S*\s*)+$/.test(strParts.first))
    {
        return {
            ...parseInlineMeta(strParts.first),
            ...strToObj(strParts.rest),
        }
    }

    return strToObj(strBlockMeta);
}