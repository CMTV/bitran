<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { usePageStore } from '@app/store/page';
import examples from 'virtual:examples';
import { useRouter } from 'vue-router';
import { resetStorage } from '@app/script/storage';

const router = useRouter();
const page = usePageStore();

const title = computed(() => {
    switch (page.mode)
    {
        case 'playground': return 'Playground';
        case 'example': return (page.example?.title ?? getExampleId()) + (page.edited ? ' *' : '');
        default: return 'Loading...';
    }
});

function selectChange(e: Event)
{
    if (page.loading)
    {
        e.preventDefault();
        return;
    }

    const options = (e.target as HTMLSelectElement).options;

    if (options.selectedIndex === 1)
    {
        options.selectedIndex = -1;
        resetStorage();
        router.push({ force: true });
        return;
    }

    router.push({ query: { example: options.item(options.selectedIndex).value } });
}

function getExampleId()
{
    return page.example?.id ?? '';
}
</script>

<template>
    <div class="w-[2px] h-[60%] bg-black/20 m-3 shrink-0"></div>
    <div :class="$style.wrapper" class="group *:cursor-pointer">
        <select class="absolute z-10 left-0 right-0 opacity-0 h-[30px]" @change="e => selectChange(e)">
            <option hidden disabled selected value> -- select an option -- </option>
            <option value="<reset>" class="text-red-500"> ... Reset Playground ... </option>
            <option
                v-for="example of examples"
                :selected="getExampleId() === example.id"
                :value="example.id">
                    {{ example.title }}
            </option>
        </select>
        <span>{{ title }}</span>
        <i
            :class="[page.loading ? 'i-arrows-circle animate-spin' : 'i-circle-down']"
            class="absolute right-0 top-[3px] text-[20px] opacity-60 transition-opacity duration-default group-hover:opacity-100"></i>
    </div>
</template>

<style module>
.wrapper
{
    @apply relative pr-7 mr-3 text-[var(--primaryColor)];

    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;
}
</style>