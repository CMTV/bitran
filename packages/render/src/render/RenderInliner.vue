<script setup lang="ts">
import { Inliner } from 'bitran-dom';
import { useDefinition } from '@src/composable';
import { RenderProps } from './RenderProps';

import InlinerSkeleton from '@src/inliner/InlinerSkeleton.vue';
import { default as InlinerComponent } from '@src/inliner/Inliner.vue';

const props = defineProps<RenderProps<Inliner>>();
const definition = useDefinition(props);
</script>

<template>
    <Suspense timeout=100>
        <InlinerComponent :node />

        <template #fallback>
            <InlinerSkeleton :nodeIcon="definition.renderer.icon" />
        </template>
    </Suspense>
</template>