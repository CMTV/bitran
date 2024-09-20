import { bitranDefinition, defineLanguages, defineRenderer } from "bitran-use";

import Definition from "./node";
import { DefinitionParser, DefinitionStr } from "./factory";

import icon from './icon.svg?raw';

export default bitranDefinition({
    Parser: DefinitionParser,
    Stringifier: DefinitionStr,
    Node: Definition,

    renderer: defineRenderer({
        Component: () => import('./component.vue'),
        icon,
    }),

    i18n: defineLanguages({
        en: () => import('./language/en'),
    }),
});