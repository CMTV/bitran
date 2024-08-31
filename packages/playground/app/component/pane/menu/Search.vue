<script setup lang="ts">
import { SearchState } from '@app/script/search';
import Icon from '@app/component/icon/Icon.vue';

const props = defineProps<{
    state: SearchState;
}>();

defineEmits<{
    (e: 'change', newQuery: string): void
}>();
</script>

<template>
    <div class="relative h-[40px] transition-[color] duration-default border-b border-[var(--stroke)]" :class="state">
        <Icon name="search" class="size-[20px] shrink-0 absolute left-3 top-[calc(50%+1px)] -translate-y-1/2 pointer-events-none" />
        <input @input="e => $emit('change', e.target['value'])" placeholder="Search" class="outline-none pl-10 h-full w-full placeholder-current bg-inherit">
    </div>
</template>