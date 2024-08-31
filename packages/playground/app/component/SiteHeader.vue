<script setup lang="ts">
import ThemeSwitch from './header/ThemeSwitch.vue';
import ShareButton from './header/ShareButton.vue';
import HeaderButton from './header/HeaderButton.vue';
import config from '@app/script/config';
import { usePageStore } from '@app/store/page';
import Icon from './icon/Icon.vue';
import { computed } from 'vue';

const page = usePageStore();

const subTitle = computed(() => {
    return page.error?.message ?? page.current?.playItem.title ?? 'Loading...';
});

interface IconData {
    content:    string;
    class?:     string;
}

const icon = computed<IconData>(() => {
    if (page.error)
        return {
            content: 'warning',
        };

    if (page.loading)
        return {
            content:    'loading',
            class:      'animate-spin opacity-50'
        };

    if (page.current?.playItem.icon)
        return {
            content: page.current.playItem.icon
        };

    return null;
});
</script>

<template>
    <header class="h-[var(--headerHeight)] bg-[var(--primaryBg)] text-[var(--primaryColor)] pl-3 flex items-center relative shadow">
        <div class="max-mobile:hidden font-semibold text-xl">{{ config.title }}</div>
        <div class="max-mobile:hidden w-[2px] h-[60%] bg-black/20 dark:bg-white/15 m-3 shrink-0"></div>

        <div
            class="max-mobile:font-semibold max-mobile:text-lg flex items-center gap-2 overflow-hidden"
            :class="{ 'text-red-700 dark:text-red-500': page.error }">
            <Icon v-if="icon" :name="icon.content" :class="icon.class" class="fill-current size-[24px] shrink-0" />
            <h1 class="overflow-hidden whitespace-nowrap text-ellipsis">{{ subTitle }}</h1>
        </div>

        <div class="flex-1"></div>

        <ShareButton />
        <ThemeSwitch />
        <HeaderButton icon="github" label="GitHub" :href="config.repoLink ?? 'https://github.com/CMTV/bitran'" />
    </header>
</template>