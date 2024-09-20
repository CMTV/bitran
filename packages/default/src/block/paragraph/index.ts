import { bitranDefinition, defineLanguages, defineRenderer } from "bitran-use";
import { Paragraph } from "bitran-dom";

import icon from './icon.svg?raw';

export default bitranDefinition({
    Parser: null,
    Stringifier: null,
    Node: Paragraph,

    renderer: defineRenderer({
        icon,
        Component: () => import('./component.vue'),
    }),

    i18n: defineLanguages({
        en: () => import('./language/en'),
        ru: () => import('./language/ru'),
    }),
});