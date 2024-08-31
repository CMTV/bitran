import { Component } from "vue";
import { ParseFactory, Node, StrFactory, Inliner } from "bitran-dom";
import { PhrasesLoader } from "./language";

import defaultBlockIcon from '@asset/block.svg?raw';
import defaultInlinerIcon from '@asset/inliner.svg?raw';
import { Renderer } from "./render";

export interface BitranDefinition<TNode extends Node = Node>
{
    Node: new () => TNode;
    Parser: new () => ParseFactory;
    Stringifier: new () => StrFactory;

    renderer: Renderer;
    // blockClass: string;
    // customRender: boolean;
    // loadComponent: () => Promise<Component>;
    // asyncComponent: Component; // ! Rename to just Component

    //icon: string;
    phraseLoader: PhrasesLoader; // ! Use the same strategy as defineAsyncComponent(() => import(...))
}

//type OptionalOptions = ''; //'blockClass' | 'customRender';

//export type DefinitionOptions = Omit<BitranDefinition, OptionalOptions> & Partial<Pick<BitranDefinition, OptionalOptions>>;

export function bitranDefinition(options: BitranDefinition): BitranDefinition
{
    const resolvedOptions = {
        ...options,
    };

    if (!resolvedOptions.renderer.icon)
        resolvedOptions.renderer.icon = options.Node.prototype instanceof Inliner ? defaultInlinerIcon : defaultBlockIcon;

    return resolvedOptions;
}