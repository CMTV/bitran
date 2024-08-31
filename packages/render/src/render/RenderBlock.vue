<script setup lang="ts">
import { Block } from 'bitran-dom';
import { RenderProps } from './RenderProps';
import { ErrorData } from '@src/error';
import { useDefinition } from '@src/composable/definition';
import { useNode } from '@src/composable/node';

import BlockSkeleton from '@src/block/BlockSkeleton.vue';
import { default as BlockComponent } from '@src/block/Block.vue';

const props = defineProps<RenderProps<Block> & { errorData?: ErrorData }>();
const node = useNode(props);
const definition = useDefinition(node);
</script>

<template>
    <Suspense timeout=100>
        <BlockComponent :node :errorData />

        <template #fallback>
            <BlockSkeleton :nodeIcon="definition.renderer.icon" />
        </template>
    </Suspense>
</template>