<script setup lang="ts">
import { menu } from '@app/script/nav';
import MenuCategory from './MenuCategory.vue';
</script>

<template>
    <div dir="rtl" class="flex-1 overflow-auto scroll">
        <MenuCategory dir="ltr" :category v-for="category of Object.values(menu)" />
    </div>
</template>