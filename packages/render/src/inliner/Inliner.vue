<script setup lang="ts">
import { Inliner } from 'bitran-dom';
import { useDefinition } from '@src/composable';
import { RenderProps } from '@src/render/RenderProps';

const props = defineProps<RenderProps<Inliner>>();

const definition = useDefinition(props);
const InlinerComponent = definition.value.renderer.Component;

//await new Promise(resolve => setTimeout(resolve, 1000));
</script>

<template>
    <InlinerComponent :node />
</template>