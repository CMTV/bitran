<script setup lang="ts">
import { cls } from '@src/style';

defineProps<{
    icon: string;
    label: string;
}>();
</script>

<template>
    <button :class="cls.popupItem">
        <div :class="cls.icon" v-html="icon"></div>
        <div :class="cls.label">{{ label }}</div>
    </button>
</template>