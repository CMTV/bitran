export { useBitran } from '@src/use';

export {
    //type DefinitionOptions,
    type BitranDefinition,
    bitranDefinition,
} from '@src/definition';

export {
    type Renderer,
    defineRenderer,
} from '@src/render';

// TODO: Move phrases to new "bitran-lang" package?

export {
    type Phrase,
    type Phrases,
    type PhrasesLoader, // ! Отдельная бибилотека для async переводов. С возможность указать свои функции для многозначных слов и наборов предустановленных функций, например для английского и русского языков

    definePhrases,
    getPhrases,
    getDefaultPhrases,

    usePhrases,
} from '@src/language';