<script setup lang="ts">
import Icon from '@app/component/icon/Icon.vue';

defineProps<{
    icon:   string;
    label?: string;
    href?:  string;
}>();
</script>

<template>
    <component :is="href ? 'a' : 'button'" :href class="flex items-center gap-3 p-3 opacity-70 hover:opacity-100 transition-opacity duration-default">
        <Icon :name="icon" class="size-[22px]" />
        <div v-if="label" class="font-semibold max-mobile:hidden">{{ label }}</div>
    </component>
</template>