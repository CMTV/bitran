<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import { RootNode } from 'bitran-dom';
import { Pane as UiPane } from '@app/store/ui';
import { interState } from '@app/script/inter';
import { usePageStore } from '@app/store/page';
import { ContextItem, ContextItems, createContextItems, stringifyContextItems } from '@app/script/context';
import { useCodeStore } from '@app/store/code';

import Pane from './Pane.vue';
import PaneHeader from './PaneHeader.vue';
import ResultLabelSwitch from './result/ResultLabelSwitch.vue';
import ResultDocs from './result/ResultDocs.vue';
import ResultRender from './result/ResultRender.vue';
import ResultContextSelect from './result/ResultContextSelect.vue';
import ResultEditMode from './result/ResultEditMode.vue';


enum ResultPane
{
    Docs = 'docs',
    Render = 'render',
}

const resultPane = ref<ResultPane>(ResultPane.Render);

const codeStore = useCodeStore();
const page = usePageStore();
const hasDocs = ref<boolean>();

watch(interState, () => {
    hasDocs.value = !!page.current?.data?.docs;

    if (!hasDocs.value)
        resultPane.value = ResultPane.Render;
});

codeStore.$onAction(({ name }) => {
    if (name === 'codeChangeEvent')
        parseRender();
});

//
// Render
//

const editMode = ref<boolean>(true);

const contextItems = shallowRef<ContextItems>();
const currentContext = shallowRef<ContextItem>();
const root = shallowRef<RootNode>();

async function parseRender()
{
    contextItems.value = await createContextItems(codeStore.code);
}

watch(currentContext, () => {
    root.value = currentContext.value.root;
});

function internalChange()
{
    if (!editMode.value)
        return;

    const newCode = stringifyContextItems(contextItems.value);
    codeStore.setCode(newCode, {
        silent: true,
    });
}
</script>

<template>
    <Pane :pane="UiPane.Result" class="flex-1 flex flex-col overflow-auto">
        <PaneHeader>
            <ResultLabelSwitch :class="{ 'hidden': !hasDocs }" icon="file" label="Docs" @click="resultPane = ResultPane.Docs" :active="resultPane === ResultPane.Docs" />
            <ResultLabelSwitch icon="monitor" label="Result" @click="resultPane = ResultPane.Render" :active="resultPane === ResultPane.Render" />

            <ResultContextSelect
                v-if="contextItems"
                :class="{ 'hidden': resultPane !== ResultPane.Render }"
                :contextItems
                v-model="currentContext" />

            <ResultEditMode
                :class="{ 'hidden': resultPane !== ResultPane.Render }"
                v-model="editMode" /> 
        </PaneHeader>

        <div class="flex-1 overflow-auto">
            <ResultDocs :class="{ 'hidden': resultPane !== ResultPane.Docs }" />

            <ResultRender
                :class="{ 'hidden': resultPane !== ResultPane.Render }"
                :editMode
                :root
                :onInternalChange="internalChange" />
        </div>
    </Pane>
</template>