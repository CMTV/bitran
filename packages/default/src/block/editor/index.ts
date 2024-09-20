import { bitranDefinition, defineLanguages, defineRenderer } from "bitran-use";
import { Editor } from "bitran-dom";

import icon from './icon.svg?raw';

export default bitranDefinition({
    Parser: null,
    Stringifier: null,
    Node: Editor,

    renderer: defineRenderer({
        Component: () => import('./component.vue'),
        icon,
        blockClass: 'editor',
        custom: true,
    }),

    i18n: defineLanguages({
        en: () => import('./language/en'),
    }),
});