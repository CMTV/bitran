<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { cls } from '@src/style';

import addIcon from './add.svg?raw';
import { useRendererLanguage } from '@src/composable/language';

const emits = defineEmits(['add']);

const float = ref<HTMLDivElement>();
const add = ref<HTMLDivElement>();

const rendererPhrase = await useRendererLanguage();

onMounted(() => {
    add.value.addEventListener('click', () => {
        emits('add');
    });
});
</script>

<template>
    <div ref="float" :class="cls.blockFloat">
        <div :class="cls.blockFloatAligned">
            <button ref="add" :title="rendererPhrase('addBlock')" :class="cls.blockAdd">
                <div :class="cls.icon" v-html="addIcon"></div>
            </button>

            <div :class="cls.blockDragTarget"></div>
        </div>
    </div>
</template>