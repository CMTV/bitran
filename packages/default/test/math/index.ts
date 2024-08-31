import { bitranDefinition, defineRenderer } from "bitran-use";
import Math from "./node";

import icon from './icon.svg?raw';
import { MathParse, MathStr } from "./factory";

export default bitranDefinition({
    Parser: MathParse,
    Stringifier: MathStr,
    Node: Math,

    renderer: defineRenderer({
        Component: () => import('./component.vue'),
        icon,
    }),

    phraseLoader: {
        en: async () => (await import('../definition/language/en')).default,
    }
});