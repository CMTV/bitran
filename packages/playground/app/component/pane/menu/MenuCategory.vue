<script setup lang="ts">
import { MenuCategory } from '@app/script/nav';
import MenuPlayItem from './MenuPlayItem.vue';

defineProps<{
    category: MenuCategory
}>();
</script>

<template>
    <div
        v-if="category.playItems.length > 0"
        class="border-t first:border-0 border-[var(--stroke)] py-2">

        <div v-if="category.title" class="font-semibold text-[17px] text-[var(--textShade2)] px-3 py-2">
            {{ category.title }}
        </div>

        <div>
            <MenuPlayItem :playItem v-for="playItem of category.playItems" />
        </div>
    </div>
</template>