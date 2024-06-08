<script setup lang="ts">
import SiteHeader from '@app/component/SiteHeader.vue';
import SiteMain from '@app/component/SiteMain.vue';
import SiteFooter from '@app/component/SiteFooter.vue';
import { onMounted } from 'vue';

//
// Disable Ctrl + S
//

onMounted(() => {
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS')
            e.preventDefault();
    });
});
</script>

<template>
    <SiteHeader />
    <SiteMain />
    <SiteFooter />
</template>