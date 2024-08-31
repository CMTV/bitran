<script setup lang="ts">
import { Component, onErrorCaptured, shallowRef } from 'vue';
import { Block, ErrorNode, GroupNode, Inliner } from 'bitran-dom';
import { ErrorData, ErrorStage } from '@src/error';
import { RenderProps } from './RenderProps';

import RenderGroup from './RenderGroup.vue';
import RenderBlock from './RenderBlock.vue';
import RenderInliner from './RenderInliner.vue';
import RenderError from './RenderError.vue';

const props = defineProps<RenderProps>();

const ToRender = shallowRef<Component>();
const errorData = shallowRef<ErrorData>();

if (props.node instanceof ErrorNode)
    errorData.value = {
        stage: ErrorStage.Parse,
        error: props.node.error,
    }

switch (true)
{
    case props.node instanceof GroupNode:
        ToRender.value = RenderGroup;
        break;

    case props.node instanceof Block:
        ToRender.value = RenderBlock;
        break;

    case props.node instanceof Inliner:
        ToRender.value = RenderInliner;
        break;
}

onErrorCaptured(e => {
    console.warn('Error during render!');
    console.error(e);
    errorData.value = {
        stage: ErrorStage.Render,
        error: e,
    }
    return false;
});
</script>

<template>
    <RenderError v-if="errorData" :node :errorData />
    <ToRender v-else v-if="ToRender" :node />
</template>