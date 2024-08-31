<script setup lang="ts">
import { ref } from 'vue';
import HeaderButton from './HeaderButton.vue';

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

let stateResetTimeout;
function share()
{
    // TODO: compress and copy
    console.log('Share!');

    currentState.value = copiedState;

    clearTimeout(stateResetTimeout);
    stateResetTimeout = setTimeout(() => {
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