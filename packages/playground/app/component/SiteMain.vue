<script setup lang="ts">
import PaneMenu from '@app/component/pane/PaneMenu.vue';
import PaneCode from '@app/component/pane/PaneCode.vue';
import PaneResult from '@app/component/pane/PaneResult.vue';
</script>

<template>
    <main class="flex divide-x divide-[var(--stroke)] h-[calc(100%-var(--headerHeight)-var(--footerHeight))] mobile:h-[calc(100%-var(--headerHeight))]">
        <PaneMenu />
        <PaneCode />
        <PaneResult />
    </main>
</template>