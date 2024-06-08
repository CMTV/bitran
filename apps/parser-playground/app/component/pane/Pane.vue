<script setup lang="ts">
import { Pane, useUiStore } from '@app/store/ui';

const ui = useUiStore();

defineProps<{
    pane: Pane;
    title: string;
    icon: string;
}>();
</script>

<template>
    <section class="flex-1 flex flex-col overflow-auto" :class="{ 'max-mobile:hidden': pane !== ui.pane }">
        <header class="h-[40px] bg-gradient-to-r from-neutral-200 to-neutral-50 border-t border-b border-[var(--stroke)] flex items-stretch ps-3">
            <h2 class="font-semibold text-neutral-700 flex items-center gap-2">
                <i :class="`i-${icon}`" class="text-[18px] relative top-[1px]"></i>
                {{ title }}
            </h2>
            <div class="flex-1">
                <slot name="header"></slot>
            </div>
        </header>
        <div class="flex-1 overflow-auto">
            <slot></slot>
        </div>
    </section>
</template>