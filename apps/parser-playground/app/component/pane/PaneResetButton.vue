<script setup lang="ts">
defineProps<{
    initialValue?: string,
    currentValue?: string,
}>();

defineEmits<{
    (e: 'revert'): void
}>();
</script>

<template>
    <div
        class="h-full flex items-center justify-end opacity-0 transition-opacity duration-default"
        :class="currentValue === initialValue || !initialValue ? 'pointer-events-none touch-none' : 'opacity-100'">
        <i
            title="Revert"
            class="i-revert px-3 py-2 cursor-pointer opacity-65 hover:opacity-100 transition-opacity duration-default text-neutral-500 text-[20px]"
            @click="$emit('revert')">
        </i>
    </div>
</template>