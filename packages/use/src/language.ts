type MustHavePhrases = {
    title: string;
}

export type Phrase = string | ((...args: any[]) => string);

export type Phrases = Record<string, Phrase> & MustHavePhrases;

export function definePhrases<Template extends Phrases>(phrases: Template)
{
    return phrases;
}

export interface PhrasesLoader {
    [language: string]: () => Promise<Phrases>;
}

//
//
//

export async function getPhrases(language: string, loader: PhrasesLoader): Promise<Phrases>
{
    return loader?.[language]?.() ?? getDefaultPhrases(loader);
}

export async function getDefaultPhrases(loader: PhrasesLoader): Promise<Phrases>
{
    return Object.values(loader)?.[0]?.();
}

export function usePhrases(phrases: Phrases)
{
    return function (phraseId: string, ...args: any[])
    {
        const phrase = phrases?.[phraseId];

        if (typeof phrase === 'string')
            return phrase;

        if (!phrase)
            return `{{{ ${phraseId} }}}`;

        return phrase(...args);
    }
}