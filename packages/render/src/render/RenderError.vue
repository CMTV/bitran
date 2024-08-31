<script setup lang="ts">
import { ref } from 'vue';
import { ErrorNode, Inliner, Node, ProductType } from 'bitran-dom';
import { ErrorData } from '@src/error';

import InlinerError from '@src/inliner/InlinerError.vue';
import RenderBlock from './RenderBlock.vue';

const props = defineProps<{
    node: Node;
    errorData: ErrorData;
}>();

const renderType = ref<ProductType>(
    props.node instanceof Inliner ? ProductType.Inliner : props.node instanceof ErrorNode ? props.node.contextType : ProductType.Block
);
</script>

<template>
    <component
        :is="renderType === ProductType.Inliner ? InlinerError : RenderBlock"
        :node
        :errorData
    />
</template>