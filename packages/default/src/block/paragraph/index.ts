import { bitranDefinition, defineRenderer } from "bitran-use";
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

    phraseLoader: {
        en: async () => (await import('./language/en')).default,
        ru: async () => (await import('./language/ru')).default,
    }
});