<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { SearchItem } from '@app/script/search';
import Icon from '@app/component/icon/Icon.vue';

defineProps<{
    results: SearchItem[];
}>();

const emits = defineEmits<{
    (e: 'resultClick', path: string): void
}>();

function searchItemClick(e: Event, path: string)
{
    emits('resultClick', path);
}
</script>

<template>
    <div dir="rtl" class="flex-1 overflow-auto scroll text-[var(--textShade1)]">
        <div dir="ltr">
            <div v-for="result of results">
                <RouterLink @click.capture="searchItemClick($event, result.path)" :to="'/?path=' + result.path" class="__menuItem items-start flex gap-2 px-3 py-2 min-h-[40px]">
                    <Icon :name="result.icon" class="size-[20px] shrink-0 relative top-[3px]" />
                    <div class="flex flex-col">
                        <span>{{ result.title }}</span>
                        <span v-if="result.secondary.length" class="text-[13px] text-[var(--textShade2)]">
                            {{ result.secondary.join(' / ') }}
                        </span>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>