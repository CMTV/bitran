<script setup lang="ts">
import { Node } from 'bitran-dom';
import { ErrorData, ErrorStage } from '@src/error';
import { useDefinition, useNodeName } from '@src/composable';

const props = defineProps<{
    node: Node;
    errorData: ErrorData;
}>();

const nodeName = useNodeName(props);
const definition = useDefinition(props);
</script>

<template>
    <span :class="$style.inlinerError" :title="nodeName + ' — ' + (errorData.stage === ErrorStage.Parse ? 'Parse' : 'Render') + ' error'">
        <span :class="$style.icon" v-html="definition.renderer.icon"></span>
        <span :class="$style.message">
            <span style="font-weight: bold;">[{{ errorData.stage === ErrorStage.Parse ? 'P' : 'R' }}]</span>
            {{ errorData.error.message }}
        </span>
    </span>
</template>

<style module lang="scss">
@use '$public/def';

.inlinerError
{
    margin: 0 10px;
    border-radius: 5px;

    font-size: 85%;
    background: #fcd6d6;
    color: #733131;
    padding: 2px 5px;

    cursor: help;

    @include def.themeDark
    {
        background: #452727;
        color: #c58585;
    }

    & + &
    {
        margin-left: 0;
    }
}

.icon
{
    display: inline-block;
    position: relative;
    top: 2px;
    width: 15px;
    height: 15px;
    margin-right: 3px;
    fill: #733131;

    @include def.themeDark
    {
        fill: #c58585;
    }
}

.message
{
    position: relative;
    top: -1px;
}
</style>