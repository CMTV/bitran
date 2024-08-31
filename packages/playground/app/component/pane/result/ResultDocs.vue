<script setup lang="ts">
import { usePageStore } from '@app/store/page';
import { computed, h } from 'vue';

const page = usePageStore();

const docsComponent = computed(() => {
    const docs = page.current?.data?.docs;

    if (typeof docs === 'string')
        return h('div', { innerHTML: docs });

    return docs;
});
</script>

<template>
    <div class="h-full w-full overflow-auto" :class="$style.docsHolder">
        <div :class="$style.docs">
            <component
                :is="docsComponent"
                class="prose dark:prose-invert max-mobile:prose-sm prose-img:mx-auto prose-figcaption:text-center prose-h1:font-semibold prose-h1:text-[32px] max-w-none" />
        </div>
    </div>
</template>

<style module lang="scss">
$docsWidth: 880px;

.docsHolder
{
    container: docs / inline-size;
}

.docs
{
    max-width: $docsWidth;
    @apply bg-neutral-50 dark:bg-neutral-800 px-16 py-10 min-h-full m-auto border-x border-[var(--stroke)] shadow-xl;

    @container docs (max-width: #{$docsWidth})
    {
        @apply border-none p-5;
    }

    .markdown-body
    {
        width: 100%;
    }
}
</style>