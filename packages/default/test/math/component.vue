<script setup lang="ts">
import { RenderProps } from 'bitran-render';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import Math from './node';

const props = defineProps<RenderProps<Math>>();
</script>

<template>
    <div v-once v-html="katex.renderToString(node.latex, { displayMode: true })"></div>
</template>