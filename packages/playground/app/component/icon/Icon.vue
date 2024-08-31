<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    name: string
}>();

const icons: Record<string, string> = import.meta.glob('./*.svg', { query: '?raw', eager: true, import: 'default' });
const iconSvg = ref<string>();

watch(props, () => {
    const iconPath = `./${props.name}.svg`;
    iconSvg.value = icons[iconPath] ?? props.name;
}, { immediate: true});
</script>

<template>
    <div v-html="iconSvg" class="fill-current"></div>
</template>