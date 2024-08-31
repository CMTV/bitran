<script setup lang="ts">
import Icon from '@app/component/icon/Icon.vue';

const active = defineModel();
</script>

<template>
    <button
        title="Edit mode"
        class="relative px-2 py-2 flex items-center transition-[color] duration-default"
        :class="active ? 'text-[var(--textColor)]' : 'text-[var(--textShade3)] hover:text-[var(--textShade1)]'"
        @click="active = !active">
        <Icon name="edit" class="relative z-10 size-[20px]" />
        <div
            class="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[28px] rounded-full bg-[var(--stroke)] transition-[background] duration-default"
            :class="{ 'bg-transparent': !active }"></div>
    </button>
</template>