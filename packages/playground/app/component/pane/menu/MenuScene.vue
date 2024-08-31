<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { MenuScene } from '@app/script/nav';
import { usePageStore } from '@app/store/page';
import { computed } from 'vue';
import Icon from '@app/component/icon/Icon.vue';

const props = defineProps<{
    scene: MenuScene
}>();

const page = usePageStore();

const active = computed(() => {
    return props.scene.pagePath === page.current?.path;
});
</script>

<template>
    <RouterLink
        :to="scene.pagePath ? '/?path=' + scene.pagePath : ''"
        class="__menuItem pl-6" :class="{ '__menuItem_Active': active }">
        
        <Icon name="scene" class="size-[16px] shrink-0" />
        <span class="text-[14px]">{{ scene.title }}</span>
    </RouterLink>
</template>