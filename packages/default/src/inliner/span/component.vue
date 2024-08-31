<script setup lang="ts">
import { Span } from 'bitran-dom';
import { Render, RenderProps } from 'bitran-render';

defineProps<RenderProps<Span>>();
</script>

<template>
    <span>
        <Render :node="node.content" />
    </span>
</template>