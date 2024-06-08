<script setup lang="ts">
import { useStateStore } from '@app/store/state';
import HeaderButton from './HeaderButton.vue';
import { compressToEncodedURIComponent } from 'lz-string';
import { ref } from 'vue';

type ShareState = {
    icon:   string;
    label:  string;
    class:  string;
}

const defaultState: ShareState = {
    icon:   'share',
    label:  'Share',
    class:  ''
}

const copiedState: ShareState = {
    icon:   'complete',
    label:  'Copied!',
    class:  'text-green-700'
}

const currentState = ref<ShareState>(defaultState);

//
//
//

const state = useStateStore();

let revertStateTimeout;
function share()
{
    const compressed = compressToEncodedURIComponent(JSON.stringify({ config: state.config, content: state.content }));
    const link = location.host + '?code=' + compressed;
    navigator.clipboard.writeText(link);

    currentState.value = copiedState;

    clearTimeout(revertStateTimeout);
    revertStateTimeout = setTimeout(() => {
        currentState.value = defaultState;
    }, 2000);
}
</script>

<template>
    <HeaderButton
        @click="share"
        :icon="currentState.icon"
        :label="currentState.label"
        :class="currentState.class"
        title="Copy share link" />
</template>