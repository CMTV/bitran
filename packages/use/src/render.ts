import { Component, defineAsyncComponent, h, VNode } from "vue";

export interface Renderer
{
    /**
     * Loa
     */
    Component: (() => Promise<any>);

    icon?: string;

    /**
     * Whether to use default layout with aside controls or not.
     */
    custom?: boolean;

    /**
     * 
     */
    blockClass?: string;
}

export function defineRenderer(options: Renderer): Renderer
{
    return {
        ...options,
        ...{
            Component: defineAsyncComponent(options.Component),
            blockClass: options.blockClass || '',
        }
    }
}