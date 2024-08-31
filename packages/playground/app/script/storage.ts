import { ref, watch } from "vue";
import { interState } from "./inter";
import { usePageStore } from "@app/store/page";

export interface Storage
{
    path:    string;
    code:    string;
}

const storageKey = '__bitran-playground-storage';

export const storage = ref<Storage>(getStorage());

//
//
//

watch(storage, saveStorage, { deep: true });

function getStorage()
{
    let readyStorage = getDefaultStorage();

    const rawStorage = localStorage.getItem(storageKey);
    if (rawStorage)
        try { readyStorage = JSON.parse(rawStorage); }
        catch (e)
        {
            console.error(e);
            console.warn('Using default storage!');
        }

    return readyStorage;
}

function getDefaultStorage(): Storage
{
    return {
        path: null,
        code: null,
    }
}

function saveStorage()
{
    localStorage.setItem(storageKey, JSON.stringify(storage.value));
}