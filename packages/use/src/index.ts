export { useBitran } from '@src/use';

export {
    type BitranDefinition,
    bitranDefinition,
} from '@src/definition';

export {
    type Renderer,
    defineRenderer,
} from '@src/render';

export {
    type Phrase,
    type Phrases,
    type PhrasesLoader,

    defineLanguages,
    definePhrases,
    getPhrases,
    getDefaultPhrases,
    usePhrases,
} from '@src/language';