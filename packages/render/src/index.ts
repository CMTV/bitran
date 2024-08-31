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

export {
    usePhrases,
} from '@src/composable';

export {
    useNode,
    useNodeName,
} from '@src/composable/node';

export {
    useDefinition
} from '@src/composable/definition';

//
// Composable
//

export { useDomUpdate } from '@src/composable/domUpdate';