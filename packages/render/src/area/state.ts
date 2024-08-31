import { DOM, Parser, RootNode, Stringifier } from "bitran-dom";
import { BitranDefinition } from "bitran-use";
import { inject, InjectionKey, Ref, toRefs } from "vue";

export interface AreaState
{
    /**
     * Web-page-unique ID of content area.
     * Used to scope IDs of all products inside so they won't interfier with other products.
     */
    id: string;

    /**
     * Enable content editing functionality: adding, editing, moving and removing blocks.
     */
    editMode?: boolean;

    /**
     * Language code to load proper translations for products.
     */
    language: string;

    /**
     * Root node.
     */
    root: RootNode;

    /**
     * Map of node definitions that can be rendered in this `<ContextArea />`.
     */
    definitions?: Record<string, BitranDefinition>;

    theme: 'light' | 'dark';

    updateSymbol?: symbol;

    //
    //
    //

    parser: Parser;
    stringifier: Stringifier;
    dom: DOM<{}>;
}

export const areaStateKey = Symbol() as InjectionKey<AreaState>;

export function useAreaState()
{
    return inject(areaStateKey);
}