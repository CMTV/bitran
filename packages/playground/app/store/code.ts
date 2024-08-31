import { defineStore } from "pinia";
import { readonly, ref, watch } from "vue";
import { storage } from "@app/script/storage";
import { interState } from "@app/script/inter";
import { usePageStore } from "./page";

export interface SetCodeOptions
{
    /** Set new code as default (possible to revert to). */
    default?: boolean;

    /** Do not trigger anything, just set the code. */
    silent?: boolean;

    /** Set new code to `PaneCode.vue` */
    setPaneCode?: boolean;

    /** Save new code to local storage. */
    cache?: boolean;
}

export const useCodeStore = defineStore('code', () => {
    {
        //
        // Store init
        //

        const page = usePageStore();

        watch(interState, newState => {
            let newCode = page.current?.data?.code;
            codeDefault.value = newCode;

            if (newState.initial)
                if (storage.value.path === page.current?.path)
                    newCode = storage.value.code;

            storage.value.path = page.current?.path;

            setCode(newCode);
        });
    }

    const codeDefault = ref<string>();
    const code = ref<string>();

    function setCode(newCode: string, options: SetCodeOptions = null)
    {
        options = {
            ...options,
            ...{
                default: options?.default ?? false,
                silent: options?.silent ?? false,
                setPaneCode: options?.setPaneCode ?? true,
                cache: options?.cache ?? true,
            }
        };

        code.value = newCode;

        if (options.default)
            codeDefault.value = newCode;

        if (options.cache)
            storage.value.code = newCode;

        if (!options.silent)
            useCodeStore().codeChangeEvent();

        if (options.setPaneCode)
            useCodeStore().setPaneCodeEvent();
    }

    function setPaneCodeEvent() {}
    function codeChangeEvent() {}

    return {
        default: readonly(codeDefault),
        code: readonly(code),
        setCode,
        setPaneCodeEvent,
        codeChangeEvent,
    }
});