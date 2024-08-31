<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { MenuPlayItem } from '@app/script/nav';
import { computed, ref, watch } from 'vue';
import { usePageStore } from '@app/store/page';
import Icon from '@app/component/icon/Icon.vue';
import MenuScene from './MenuScene.vue';

const props = defineProps<{
    playItem: MenuPlayItem
}>();

const page = usePageStore();

const active = computed(() => {
    if (props.playItem.scenes.length === 0)
        return props.playItem.pagePath === page.current?.path;
});

const activePlayItem = computed(() => {
    return (page.current?.playItem.id === props.playItem.id);
});

const scenesVisible = ref(false);

watch(activePlayItem, () => {
    if (props.playItem.scenes.length === 0)
    {
        scenesVisible.value = false;
        return;
    }

    if (activePlayItem.value)
        scenesVisible.value = true;
}, { immediate: true });

function linkClick(e: Event)
{
    if (activePlayItem.value)
    {
        // Click while being inside play item
        e.preventDefault();
        scenesVisible.value = !scenesVisible.value;
        return;
    }

    if (!activePlayItem.value)
    {
        // Click from another play item
        if (scenesVisible.value)
        {
            e.preventDefault();
            scenesVisible.value = false;
        }
        return;
    }
}
</script>

<template>
    <div>
        <RouterLink
            :to="playItem.pagePath ? '/?path=' + playItem.pagePath : ''"
            @click.capture="linkClick($event)"
            class="__menuItem" :class="{ '__menuItem_Active': active }">

            <Icon :name="playItem.icon" class="size-[20px] shrink-0" />
            <span>{{ playItem.title }}</span>
        </RouterLink>

        <div v-if="scenesVisible">
            <MenuScene :scene v-for="scene of playItem.scenes" />
        </div>
    </div>
</template>