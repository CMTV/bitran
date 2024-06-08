import { defineStore } from "pinia";
import { ref } from "vue";

export enum Pane
{
    Config = 'config',
    Content = 'content',
    Result = 'result',
}

export const useUiStore = defineStore('ui', () => {
    const pane = ref<Pane>(Pane.Config);

    return { pane };
});