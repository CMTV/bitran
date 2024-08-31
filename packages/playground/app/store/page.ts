import config from "@app/script/config";
import { ResolvedPlayItem, ResolvedScene } from "@app/script/resolvedContent";
import { defineStore } from "pinia";
import { type SceneData } from "src/cli/plugin/content";
import { computed, readonly, ref } from "vue";

export interface Page
{
    path:       string;
    playItem:   ResolvedPlayItem;
    scene:      ResolvedScene;
    data?:      SceneData;
}

export const usePageStore = defineStore('page', () => {
    const current = ref<Page>();
    const loading = ref<boolean>();
    const error = ref<Error>();

    async function setCurrent(newPage: Page)
    {
        current.value = newPage;

        if (newPage)
        {
            current.value.data = await newPage.scene.loadData();
            current.value.data.code = current.value.data.code.replace(/\r\n/g, "\n");
        }
    }

    const documentTitle = computed(() => {
        if (error.value)
            return config.title + ' / Error!';

        if (!current.value)
            return config.title + ' / Playground';

        let title = `${config.title} / ${current.value.playItem.title}`;

        if (current.value.scene.title)
            title += ` - ${current.value.scene.title}`;

        return title;
    });

    return {
        current: readonly(current),
        setCurrent,
        loading,
        error,
        documentTitle,
    };
});