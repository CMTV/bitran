<script setup lang="ts">
import PaneConfig from '@app/component/pane/PaneConfig.vue';
import PaneContent from '@app/component/pane/PaneContent.vue';
import PaneResult from '@app/component/pane/PaneResult.vue';
</script>

<template>
    <main class="flex mobile:h-[calc(100%-var(--headerHeight))] h-[calc(100%-var(--headerHeight)-var(--footerHeight))] divide-x divide-[var(--stroke)]">
        <PaneConfig />
        <PaneContent />
        <PaneResult />
    </main>
</template>