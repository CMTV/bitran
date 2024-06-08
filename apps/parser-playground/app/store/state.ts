import { storage } from '@app/script/storage';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useStateStore = defineStore('state', () => {
    const _config =  ref<string>();
    const _content = ref<string>();

    const config = computed(() =>   _config.value);
    const content = computed(() =>  _content.value);

    watch([_config, _content], () => {
        storage.value = {
            config: _config.value,
            content: _content.value
        }
    });

    useStateStore().$onAction(action => {
        switch (action.name)
        {
            case 'changeEvent':
                const event = action.args[0];
                useStateStore().render(event.source === ChangeSrc.System ? 0 : (event.target.config ? 300 : 200), event.target.config);
                break;
        }
    });

    function changeState(changeSrc: ChangeSrc, newState: { config?: string, content?: string })
    {
        let configChanged = false, contentChanged = false;

        const changed = value => value !== null && value !== undefined;

        if (changed(newState['config']))
        {
            configChanged = true;
            _config.value = newState['config'];
        }

        if (changed(newState['content']))
        {
            contentChanged = true;
            _content.value = newState['content'];
        }

        const event: StateChangeEvent = {
            source: changeSrc,
            target: {
                config: configChanged,
                content: contentChanged,
            }
        }

        if (configChanged || contentChanged)
            useStateStore().changeEvent(event);
    }

    function changeEvent(e: StateChangeEvent) {}

    function render(delay: number, recreateParser: boolean) {}

    return {
        config, content,
        changeState,
        changeEvent,
        render,
    };
});

export interface StateChangeEvent
{
    source: ChangeSrc;
    target: {
        config: boolean,
        content: boolean,
    }
}

export enum ChangeSrc
{
    User = 'user',
    System = 'system',
}