import { useAreaState } from "@src/area/state";
import { Node } from "bitran-dom";
import { useDefinition } from "./definition";
import { shallowRef, watch } from "vue";
import { defineLanguages, getPhrases, usePhrases } from "bitran-use";

export async function useLanguage(node: Node)
{
    const areaState = useAreaState();
    const definition = useDefinition(node);
    const fPhrase = shallowRef<ReturnType<typeof usePhrases>>(() => '');

    watch(() => areaState.language, async () => {
        const phrases = await getPhrases(areaState.language, definition.value.i18n);
        fPhrase.value = usePhrases(phrases);
    }, { immediate: true });

    return fPhrase;
}

//
//
//

const rendererI18n = defineLanguages({
    en: () => import('../../language/en'),
    ru: () => import('../../language/ru'),
});

export async function useRendererLanguage()
{
    const areaState = useAreaState();
    const fPhrase = shallowRef<ReturnType<typeof usePhrases>>(() => '');

    watch(() => areaState.language, async () => {
        const phrases = await getPhrases(areaState.language, rendererI18n);
        fPhrase.value = usePhrases(phrases);
    }, { immediate: true });

    return fPhrase;
}