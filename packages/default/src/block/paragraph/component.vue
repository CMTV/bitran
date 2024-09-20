<script setup lang="ts">
import { Paragraph } from 'bitran-dom';
import { Render, RenderProps, useLanguage, useNode } from 'bitran-render';

const props = defineProps<RenderProps<Paragraph>>();
const node = useNode(props);

//await new Promise(resolve => setTimeout(resolve, 2000));

if (node.content.children[0].content === 'Aboba')
    throw new Error('Aboba')
</script>

<template>
    <p>
        <Render :node="node.content" />
    </p>
</template>