<script setup lang="ts">
import { Text } from 'bitran-dom';
import { RenderProps, useNode } from 'bitran-render';

const props = defineProps<RenderProps<Text>>();
const node = useNode(props);

const htmlNodes: Node[] = [];

for (const textFragment of node.content.split(/\\$/gm))
{
    if (!textFragment)
        continue;

    htmlNodes.push(document.createTextNode(textFragment.trim()));
    htmlNodes.push(document.createElement('br'));
}

htmlNodes.pop();
</script>

<template>
    <template v-for="htmlNode of htmlNodes">
        <br v-if="htmlNode.nodeName === 'BR'" />
        <template v-else>{{ htmlNode.textContent }}</template>
    </template>
</template>