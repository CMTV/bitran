<script setup lang="ts">
import { Inliner } from 'bitran-dom';
import { RenderProps } from './RenderProps';
import { useDefinition } from '@src/composable/definition';

import InlinerSkeleton from '@src/inliner/InlinerSkeleton.vue';
import { default as InlinerComponent } from '@src/inliner/Inliner.vue';
import { useNode } from '@src/composable/node';

const props = defineProps<RenderProps<Inliner>>();
const node = useNode(props);
const definition = useDefinition(node);
</script>

<template>
    <Suspense timeout=100>
        <InlinerComponent :node />

        <template #fallback>
            <InlinerSkeleton :nodeIcon="definition.renderer.icon" />
        </template>
    </Suspense>
</template>