import { defineStore } from "pinia";
import { ref } from "vue";
import { type RouteLocationRaw, type RouteLocation } from 'vue-router';
import { ChangeSrc, useStateStore } from "./state";
import { storage } from "@app/script/storage";
import { decompressFromEncodedURIComponent } from "lz-string";

export const usePageStore = defineStore('page', () => {
    const state = useStateStore();

    const loading = ref<boolean>();
    const mode =    ref<'playground' | 'example'>();
    const edited =  ref<boolean>();
    const example = ref<Example>();

    async function setupPageStore(newRoute: RouteLocation): Promise<void | RouteLocationRaw | false>
    {
        // Detect changing currently opened example
        if (
            mode.value === 'example' &&
            'edited' in newRoute.query
        ) {
            edited.value = true;
            return false;
        }

        loading.value = true;
        const query = newRoute.query;
        let toLoadExampleId;

        //await new Promise(resolve => setTimeout(resolve, 3000));

        if ('code' in query)
        {
            const sharedState = getSharedState(query['code'].toString());
            if (sharedState)
            {
                state.changeState(ChangeSrc.System, {
                    config: sharedState.config,
                    content: sharedState.content,
                });
            }
            return {};
        }

        if ('example' in query)
        {
            mode.value = 'example';
            toLoadExampleId = query['example'];
            edited.value = 'edited' in query;
        }
        else
        {
            mode.value = 'playground';
            edited.value = false;
            example.value = null;
            toLoadExampleId = null;
        }

        //

        switch (mode.value)
        {
            case 'example':
                try {
                    example.value = await loadExample(toLoadExampleId);
                }
                catch (e) {
                    console.error(e);
                    console.warn('Redirecting to playground!');
                    return {};
                }
                break;
            case 'playground':
                break;
        }

        if (mode.value === 'example' && !edited.value)
        {
            state.changeState(ChangeSrc.System, {
                config: example.value.config,
                content: example.value.content,
            });
        }
        else
        {
            state.changeState(ChangeSrc.System, {
                config: storage.value.config,
                content: storage.value.content,
            });
        }

        loading.value = false;
    }

    return { loading, mode, edited, example, setupPageStore }
});

//
//
//

export interface Example
{
    id: string;
    title: string;
    config: string;
    content: string;
}

const exampleImports = import.meta.glob('/../examples/*.yml', { import: 'default' });

async function loadExample(exampleId: string): Promise<Example>
{
    const path = `../examples/${exampleId}.yml`;

    if (!(path in exampleImports))
    {
        throw new Error(`Missing example with ID '${exampleId}'!`);
    }

    const exampleFile = await exampleImports[path]() as any;

    const example = <Example> {
        id:         exampleId,
        title:      exampleFile.title ?? exampleId,
        config:     exampleFile.config,
        content:    exampleFile.content,
    }

    return example;
}

function getSharedState(compressed: string)
{
    try
    {
        return JSON.parse(decompressFromEncodedURIComponent(compressed));
    }
    catch (e)
    {
        console.error('Error when parsing "code" URL query parameter!');
        console.error(e);
        return null;
    }
}