<script setup lang="ts">
import { Pane, useUiStore } from '@app/store/ui';

const ui = useUiStore();

defineProps<{
    pane: Pane;
}>();
</script>

<template>
    <section :class="{ 'max-mobile:hidden': pane !== ui.pane }">
        <slot></slot>
    </section>
</template>