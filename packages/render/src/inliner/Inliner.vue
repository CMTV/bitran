<script setup lang="ts">
import { Inliner } from 'bitran-dom';
import { RenderProps } from '@src/render/RenderProps';
import { useNode } from '@src/composable/node';
import { useDefinition } from '@src/composable/definition';

const props = defineProps<RenderProps<Inliner>>();
const node = useNode(props);
const definition = useDefinition(node);
const InlinerComponent = definition.value.renderer.Component;

//await new Promise(resolve => setTimeout(resolve, 1000));
</script>

<template>
    <InlinerComponent :node />
</template>