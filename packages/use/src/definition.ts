import { ParseFactory, Node, StrFactory, Inliner } from "bitran-dom";
import { PhrasesLoader } from "./language";
import { Renderer } from "./render";

import defaultBlockIcon from '@asset/block.svg?raw';
import defaultInlinerIcon from '@asset/inliner.svg?raw';

export interface BitranDefinition<TNode extends Node = Node>
{
    Node: new () => TNode;
    Parser: new () => ParseFactory;
    Stringifier: new () => StrFactory;
    renderer: Renderer;
    i18n: PhrasesLoader;
}

export function bitranDefinition(options: BitranDefinition): BitranDefinition
{
    const resolvedOptions = {
        ...options,
    };

    if (!resolvedOptions.renderer.icon)
        resolvedOptions.renderer.icon = options.Node.prototype instanceof Inliner ? defaultInlinerIcon : defaultBlockIcon;

    return resolvedOptions;
}