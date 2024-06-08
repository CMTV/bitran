import { ref, watch } from "vue";

export interface StorageState
{
    config: string;
    content: string;
}

const storageKey = '__bitran-parser-storage';

export const storage = ref<StorageState>(getStorage());

export function resetStorage()
{
    storage.value = getDefaultStorage();
}

//
//
//

watch(storage, () => saveStorage());

function getStorage(): StorageState
{
    const rawStorage = localStorage.getItem(storageKey);
    let readyStorage;

    try {
        if (!rawStorage)
            throw new Error(`Can't find saved storage!`);

        readyStorage = JSON.parse(rawStorage);
    }
    catch (e) {
        console.error(e);
        console.warn('Using default storage!');
        readyStorage = getDefaultStorage();
    }

    return readyStorage;
}

function getDefaultStorage(): StorageState
{
    return {
        config: `import { defineConfig } from 'bitran-parser';\n\nexport default defineConfig({\n    /* Setup parser options... */\n});`,
        content: 'Start typing any "bi"-text here...\n\n... or select an example above!',
    }
}

function saveStorage()
{
    localStorage.setItem(storageKey, JSON.stringify(storage.value))
}