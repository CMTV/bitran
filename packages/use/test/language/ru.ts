import { definePhrases } from "@src/language";
import type en from './en';

export default definePhrases<typeof en>({
    title: 'Русский',
    strPhrase: 'Строчная фраза',
    funcPhrase: (a: number, b: number) => (a - b) + '',
});