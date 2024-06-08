<script setup lang="ts">
defineProps<{
    label: string;
    icon: string;
    link?: string;
}>();
</script>

<template>
    <component :is="link ? 'a' : 'button'" :href="link" class="flex gap-3 items-center p-3 text-[var(--primaryColor)] opacity-70 transition-opacity duration-default hover:opacity-100">
        <i :class="`i-${icon}`" class="text-[22px] relative top-[1px]"></i>
        <span class="font-semibold max-mobile:hidden">{{ label }}</span>
    </component>
</template>