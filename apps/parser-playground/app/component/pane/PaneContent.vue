<script setup lang="ts">
import { usePageStore } from '@app/store/page';
import Pane from './Pane.vue';
import CodeMirror from '@app/component/include/CodeMirror.vue';
import { useStateStore, ChangeSrc } from '@app/store/state';
import {  ref } from 'vue';
import { useRouter } from 'vue-router';
import PaneResetButton from './PaneResetButton.vue';
import { Pane as UiPane } from '@app/store/ui';

const router = useRouter();
const page = usePageStore();
const state = useStateStore();
const contentDoc = ref<string>();

state.$onAction(action => {
    if (action.name === 'changeEvent')
    {
        const event = action.args[0];
        if (event.source === ChangeSrc.System && event.target.content)
            contentDoc.value = state.content;
    }
});

function onUserInput()
{
    if (page.mode === 'example' && !page.edited)
        router.push({ query: {...router.currentRoute.value.query, ...{ edited: null }} })

    state.changeState(ChangeSrc.User, { content: contentDoc.value });
}
</script>

<template>
    <Pane :pane="UiPane.Content" title="Content" icon="article">
        <template #header>
            <PaneResetButton
                @revert="contentDoc = page.example.content; onUserInput()"
                :initial-value="page.example?.content"
                :current-value="contentDoc" />
        </template>

        <template #default>
            <CodeMirror @user-input="onUserInput" v-model:doc="contentDoc" :readonly="page.loading" />
        </template>
    </Pane>
</template>