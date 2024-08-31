<script setup lang="ts">
import { Ref, ref, toRef, watch } from 'vue';
import { ContentArea } from 'bitran-render';
import defaultDefinitions from 'bitran-default';
import { ContextItem, ContextItems, dom, parser, stringifier } from '@app/script/context';
import config from '@app/script/config';

import Resizer from '@app/component/include/Resizer.vue';
import { RootNode } from 'bitran-dom';
import { theme } from '@app/script/theme';

const props = defineProps<{
    editMode?: boolean;
    root?: RootNode;
}>();

const emits = defineEmits(['internalChange']);

//
// 
//

let confirmChangeTimeout;
function internalDomChange()
{
    clearTimeout(confirmChangeTimeout);
    confirmChangeTimeout = setTimeout(() => emits('internalChange'), 200);
}

//
// Custom width
//

const container = ref<HTMLDivElement>();
const width = ref('');

const language = ref<string>('en');

setTimeout(() => {
    language.value = 'ru'
}, 4000);

function resetWidth()
{
    width.value = '';
}

function deltaWidth(deltaX: number)
{
    if (!container.value)
        return;

    width.value = container.value.offsetWidth + 2 * deltaX + 'px';
}
</script>

<template>
    <div class="h-full w-full overflow-auto">
        <div class="m-auto flex min-h-full justify-center relative">
            <div
                ref="container"
                :style="{ width: width ? `min(100%, ${width})` : null }"
                class="max-w-[850px] min-w-[360px] max-mobile:flex-1 w-full bg-neutral-50 dark:bg-neutral-800 shadow-lg border-x border-[var(--stroke)]">

                <ContentArea
                    id="playground"
                    :language
                    :editMode
                    :root
                    :definitions="{...config.definitions, ...defaultDefinitions}"
                    :parser
                    :stringifier
                    :dom
                    :theme
                    :onInternalDomChange="internalDomChange"
                />

            </div>

            <div class="w-[20px] h-[calc(100dvh-90px)] sticky top-0 flex items-center max-mobile:hidden">
                <div class="w-full h-[50px] pl-[10px] cursor-w-resize">
                    <Resizer
                        @reset="resetWidth"
                        @move="delta => deltaWidth(delta.x)"
                        class="w-full h-full rounded bg-neutral-500/60" />
                </div>
            </div>
        </div>
    </div>
</template>