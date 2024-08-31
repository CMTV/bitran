import { defineStore } from "pinia";
import { ref } from "vue";
import { switchTheme as _switchTheme, getTheme } from "@app/script/theme";

export enum Pane
{
    Menu = 'menu',
    Code = 'code',
    Result = 'result',
}

export const useUiStore = defineStore('ui', () => {
    const pane = ref<Pane>(Pane.Result);

    return {
        pane,
    };
});