<script setup lang="ts">
import { ref } from 'vue';
import { Pane as UiPane } from '@app/store/ui';
import { theme } from '@app/script/theme';
import { useCodeStore } from '@app/store/code';

import Pane from './Pane.vue';
import PaneHeader from './PaneHeader.vue';
import Icon from '@app/component/icon/Icon.vue';
import CodeMirror from '@app/component/include/CodeMirror.vue';

const codeStore = useCodeStore();

const _code = ref<string>();

codeStore.$onAction(({ name }) => {
    if (name === 'setPaneCodeEvent')
        _code.value = codeStore.code;
});

let changeDelay;

function internalCodeChange()
{
    clearTimeout(changeDelay);
    changeDelay = setTimeout(() => {
        codeStore.setCode(_code.value, {
            setPaneCode: false,
        });
    }, 200);
}

function revert()
{
    clearTimeout(changeDelay);
    codeStore.setCode(codeStore.default);
}
</script>

<template>
    <Pane :pane="UiPane.Code" class="flex-1 mobile:max-w-[800px] flex flex-col overflow-auto">
        <PaneHeader>
            <div class="flex items-center gap-2 ps-3 text-[var(--textShade1)]">
                <Icon name="code" class="size-[20px]" />
                <div class="font-semibold">Input</div>
            </div>
            <div class="flex-1"></div>

            <button
                title="Revert"
                class="flex items-center px-3 transition-opacity duration-default"
                :class="_code === codeStore.default ? 'opacity-0 pointer-events-none' : 'opacity-65 hover:opacity-100'"
                @click="revert">
                <Icon name="undo" class="size-[20px] text-[var(--textShade3)]" />
            </button>
        </PaneHeader>

        <div class="flex-1 overflow-auto">
            <CodeMirror v-model:doc="_code" :darkMode="theme === 'dark'" :onInternalInput="internalCodeChange" />
        </div>
    </Pane>
</template>