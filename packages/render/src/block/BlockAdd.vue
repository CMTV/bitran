<script lang="ts">
export enum BlockAddPos
{
    Before = 'before',
    After = 'after',
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { usePopup } from '@src/popup';

import addIcon from './add.svg?raw';
import blockStyle from '@style/block/index.module.scss';

const props = defineProps<{ pos: BlockAddPos }>();

const button = ref<HTMLElement>();
const popup = ref<HTMLElement>();

const { floatingStyles, popupActive } = usePopup(button, popup);
</script>

<template>
    <div
        ref="button"
        :class="[blockStyle.add, blockStyle[`pos--${pos}`], popupActive ? blockStyle.active : '']"
        title="Add block">

        <div :class="blockStyle.icon" v-html="addIcon" />
    </div>

    <div ref="popup" v-if="popupActive" :style="floatingStyles">
        <div style="background: white; padding: 5px;">Параграф<br>Формула<br>Определение<br>Абоба<br>Абоба</div>
    </div>
</template>