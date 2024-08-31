import { getDefaultPhrases, getPhrases, PhrasesLoader, usePhrases } from "@src/language";

import enLang from './en';
import ruLang from './ru';

const loader: PhrasesLoader = {
    en: () => import('./en').then(m => m.default),
    ru: () => import('./ru').then(m => m.default),
}

describe('Pick language', () => {
    test('Specific language', async () => {
        expect(await getPhrases('ru', loader)).toBe(ruLang);
    });

    test('Default language', async () => {
        expect(await getDefaultPhrases(loader)).toBe(enLang);
    });

    test('Specific missing language fallback to default', async () => {
        expect(await getPhrases('404', loader)).toBe(enLang);
    });

    test('No languages at all', async () => {
        expect(await getPhrases('404', {})).toBeUndefined();
    });
});

describe('Phrases', () => {
    const ruPhrase = usePhrases(ruLang);
    const enPhrase = usePhrases(enLang);

    test('String phrases', () => {
        expect(ruPhrase('strPhrase')).toBe('Строчная фраза');
        expect(enPhrase('title')).toBe('English');
    });

    test('Function phrases', () => {
        expect(ruPhrase('funcPhrase', 5, 10)).toBe('-5');
        expect(enPhrase('funcPhrase', 5, 10)).toBe('15');
        expect(enPhrase('funcPhrase')).toBe('NaN');
    });

    test('Missing phrases', () => {
        expect(enPhrase('phrase404')).toBe('{{{ phrase404 }}}');
    });
});