<script setup lang="ts">
import { Pane, useUiStore } from '@app/store/ui';
import { computed, ref } from 'vue';

const props = defineProps<{
    pane: Pane;
    icon: string;
}>();

const ui = useUiStore();
const active = computed(() => props.pane === ui.pane);
</script>

<template>
    <button
        @click="ui.pane = pane"
        class="size-[calc(var(--footerHeight)-1px)] border-t-[3px] transition duration-default"
        :class="active ? 'border-neutral-500 text-neutral-800' : 'border-transparent text-neutral-500 hover:border-neutral-400'">
        <i :class="`i-${icon}`" class="text-[25px]"></i>
    </button>
</template>