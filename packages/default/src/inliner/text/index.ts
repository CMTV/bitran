import { bitranDefinition, defineRenderer } from 'bitran-use';
import { Text } from 'bitran-dom';

import icon from './icon.svg?raw';

export default bitranDefinition({
    Parser: null,
    Stringifier: null,
    Node: Text,

    renderer: defineRenderer({
        Component: () => import('./component.vue'),
        icon,
    }),

    phraseLoader: {
        en: async () => (await import('./language/en')).default,
    }
});