<script setup lang="ts">
import ExampleSelect from './ExampleSelect.vue';
import HeaderButton from './HeaderButton.vue';
import ShareButton from './ShareButton.vue';
</script>

<template>
    <header class="relative h-[50px] bg-[var(--primaryBg)] flex items-center pl-3 shadow">
        <h1 class="text-[var(--primaryColor)] font-semibold text-xl after:content-['BP'] mobile:after:content-['Bitran_Parser']"></h1>
        <ExampleSelect />
        <div class="flex-1"></div>
        <div class="flex">
            <ShareButton />
            <HeaderButton icon="github" label="GitHub" link="https://github.com/CMTV/bitran" />
        </div>
    </header>
</template>