<script setup lang="ts">
import { Render, RenderProps, useNode } from 'bitran-render';
import Definition from './node';

import icon from './icon.svg?raw';

const props = defineProps<RenderProps<Definition>>();
const node = useNode(props);
</script>

<template>
    <div :class="$style.definition">
        <div :class="$style.aside">
            <div :class="$style.icon">
                <div v-html="icon"></div>
            </div>
        </div>
        <div :class="$style.content">
            <Render :node="node.content" />
        </div>
    </div>
</template>

<style module lang="scss">
.definition
{
    --c: #609955;

    display: flex;
    align-items: stretch;
}

.aside
{
    width: 30px;
    border-right: 3px solid var(--c);

    .icon
    {
        width: 30px;
        height: 30px;
        background: var(--c);
        padding: 0 4px;
        fill: white;

        display: flex;
        justify-content: center;
        align-items: center;

        > div { width: 100%; }
    }
}

.content
{
    flex: 1;
}
</style>