<script setup lang="ts">
import { Pane, useUiStore } from '@app/store/ui';
import { computed } from 'vue';
import Icon from '@app/component/icon/Icon.vue';

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
        class="size-[calc(var(--footerHeight)-1px)] border-t-[3px] flex items-center justify-center transition duration-default"
        :class="active ? 'border-[var(--textShade2)] text-[var(--textColor)]' : 'border-transparent text-[var(--textShade3)] hover:border-[var(--strokeStronger)]'">
        <Icon :name="icon" class="size-[27px]" />
    </button>
</template>