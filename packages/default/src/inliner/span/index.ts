import { bitranDefinition, defineLanguages, defineRenderer } from "bitran-use";
import { Span, SpanParser, SpanStr } from "bitran-dom";

import icon from './icon.svg?raw';

export default bitranDefinition({
    Parser: SpanParser,
    Stringifier: SpanStr,
    Node: Span,

    renderer: defineRenderer({
        Component: () => import('./component.vue'),
        icon,
    }),

    i18n: defineLanguages({
        en: () => import('./language/en'),
    }),
});