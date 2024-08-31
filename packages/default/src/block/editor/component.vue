<script setup lang="ts">
import { ref } from 'vue';
import { Render, RenderProps, useAreaState, useNode, useDefinition, useDomUpdate } from 'bitran-render';
import { assumeGroupItem, Editor } from 'bitran-dom';

import CodeMirror from './CodeMirror.vue';

import applyIcon from './apply.svg?raw';

const props = defineProps<RenderProps<Editor>>();

const { domUpdate } = useDomUpdate();
const areaState = useAreaState();
const node = useNode(props);
const definition = useDefinition(node);

const src = ref<string>(node.src);

let inputTimeout;
function internalInput()
{
    node.src = src.value;

    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(async () => {
        await render();
        domUpdate();
    }, 200);
}

const key = ref(1);

async function render()
{
    node.content.setNodes(await areaState.parser.parseBlocks(node.src));
    key.value++;
}

if (node.content.isEmpty())
    render();

function apply()
{
    assumeGroupItem(node).replace(...[node.content]);
    domUpdate();
}
</script>

<template>
    <div :class="$style.editorBlock">
        <div :class="$style.sectionRender">
            <div :class="$style.aside"></div>
            <Render :node="node.content" :key />
        </div>
        <div :class="$style.sectionEdit">
            <div :class="$style.aside">
                <div :class="$style.float">
                    <div :class="$style.icon" v-html="definition.renderer.icon"></div>
                    <button @click="apply" :class="$style.apply" v-html="applyIcon"></button>
                </div>
            </div>
            <div :class="$style.editor">
                <CodeMirror v-model:doc="src" v-on:internalInput="internalInput()" :darkMode="areaState.theme === 'dark'" />
            </div>
        </div>
    </div>
</template>

<style module lang="scss">
@use 'bitran-render/scss/def';
@use 'bitran-render/scss/block';

.editorBlock
{
    display: flex;
    flex-direction: column;
    gap: 2px;

    --asideBg: #cfe3f8;
    --editorBg: #e5eefb;
    --editorActiveLine: #adc5df;
    --editorCursor: black;

    @include def.themeDark
    {
        --asideBg: #303f50;
        --editorBg: #2b3139;
        --editorActiveLine: #4e6784;
        --editorCursor: white;
    }
}

.sectionRender
{
    position: relative;

    > .aside
    {
        position: absolute;
        top: 0;
        left: 3px;
        width: 20px;
        height: 100%;
        background: var(--asideBg);
        border-top-left-radius: 5px;
    }
}

.sectionEdit
{
    display: flex;

    > .aside
    {
        position: relative;

        flex-shrink: 0;
        background: var(--asideBg);
        width: 20px;
        margin-left: 3px;
        border-bottom-left-radius: 5px;

        > .float
        {
            position: sticky;
            top: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .icon,
        .apply
        {
            fill: #6994c0;
            width: 80%;
            padding: 5px 0;
        }

        .icon
        {
            padding-bottom: 0;
        }

        .apply
        {
            transition: fill def.$duration;
            &:hover { fill: #3b7dc0; }
        }
    }

    > .editor
    {
        flex: 1;
        background: var(--editorBg);
        padding-top: 2px;

        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}
</style>