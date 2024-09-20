export { default as Render } from '@src/render/Render.vue';
export { default as ContentArea } from '@src/area/ContentArea.vue';

export { type RenderProps } from '@src/render/RenderProps';

import '@style/index.scss';

export {
    domUpdateKey,
    useDomUpdateSymbol,
} from '@src/area/domUpdate';

export {
    type AreaState,
    areaStateKey,
    useAreaState,
} from '@src/area/state';

//
// Composable
//

export {
    useNode,
    useNodeName,
} from '@src/composable/node';

export {
    useDefinition,
} from '@src/composable/definition';

export {
    useLanguage,
    useRendererLanguage,
} from '@src/composable/language';

export {
    useDomUpdate,
} from '@src/composable/domUpdate';