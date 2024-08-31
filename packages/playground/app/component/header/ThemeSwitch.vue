<script setup lang="ts">
import { computed } from 'vue';
import HeaderButton from './HeaderButton.vue';
import { switchTheme, theme } from '@app/script/theme';

const themeIcon = computed(() => {
    return theme.value === 'light' ? 'sun' : 'moon';
});
</script>

<template>
    <HeaderButton @click="switchTheme" :icon="themeIcon" label="Theme" />
</template>