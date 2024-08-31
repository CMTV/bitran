<script setup lang="ts">
import { onErrorCaptured, onMounted, ref } from 'vue';
import { assumeGroupItem, Editor } from 'bitran-dom';
import { useDefinition } from '@src/composable/definition';
import { useNode } from '@src/composable/node';
import { RenderProps } from '@src/render/RenderProps';
import { cls } from '@src/style';
import { ErrorData, ErrorStage } from '@src/error';
import { doDrag, dragSource, dragTarget, DragTargetPosition } from '@src/block/drag';
import { useEditable } from '@src/composable/edit';
import { useDomUpdate } from '@src/composable/domUpdate';

import BlockFloat from './BlockFloat.vue';
import BlockAside from './BlockAside.vue';

const props = defineProps<RenderProps & { errorData?: ErrorData }>();
const node = useNode(props);
const definition = useDefinition(node);
const editable = useEditable(node);
const { domUpdate } = useDomUpdate();

const BlockComponent = definition.value.renderer.Component;

const block = ref<HTMLDivElement>();
const blockAligned = ref<HTMLDivElement>();

//await new Promise(resolve => setTimeout(resolve, 1000));

function add(after = false)
{
    const editor = new Editor;
    editor.src = 'Текст нового блока...';
    after ? assumeGroupItem(node).after(editor) : assumeGroupItem(node).before(editor);
    domUpdate();
}

//
// Drag Logic
//

const dragPosition = ref<DragTargetPosition>();

onMounted(() => {
    let mouseoutTimeout;
    let mouseover = false;

    block.value.addEventListener('mouseover', e => {
        e.stopPropagation();
        clearTimeout(mouseoutTimeout);
        mouseover = true;
    });

    block.value.addEventListener('mouseout', e => {
        if (!block.value.contains(e.relatedTarget as Node))
            mouseoutTimeout = setTimeout(unsetDrag, 50);
    });

    block.value.addEventListener('mousemove', e => {
        e.stopPropagation();

        if (!mouseover || !dragSource.value || !editable.value)
            return;

        if (dragSource.value.element.contains(block.value) && dragSource.value.element !== block.value)
            return; // Can't drag parent node inside it's child nodes

        const rect = blockAligned.value.getBoundingClientRect();
        const isBelow = e.y - rect.y > rect.height / 2;

        dragPosition.value = isBelow ? DragTargetPosition.Below : DragTargetPosition.Above;
        dragTarget.value = {
            position: dragPosition.value,
            node,
        }
    });

    block.value.addEventListener('mouseup', e => {
        if (dragTarget.value)
        {
            doDrag();
            domUpdate();
        }

        unsetDrag();
    });

    function unsetDrag()
    {
        dragPosition.value = undefined;
        dragTarget.value = undefined;
        block.value.classList.remove(cls['-dragTarget']);
    }
});
</script>

<template>
    <div ref="block" :class="[cls.block, cls[definition.renderer.blockClass]]">
        <div ref="blockAligned" :class="[cls.blockAligned, dragPosition ? cls[`-drag${dragPosition}`] : '']">

            <BlockFloat :onAdd="() => add()" :class="cls['-above']" />

            <div :class="[cls.blockInner, errorData ? cls['-error'] : definition.renderer.custom ? cls['-custom'] : cls['-default']]">
                <BlockComponent v-if="!errorData && definition.renderer.custom" :node />
                <template v-else>
                    <BlockAside :node />
                    <div :class="cls.blockContent">
                        <BlockComponent v-if="!errorData" :node />
                        <template v-else>
                            <div :class="cls.blockErrorTitle">{{ errorData.stage === ErrorStage.Parse ? 'Parse Error' : 'Render Error' }}</div>
                            <div>{{ errorData.error.message }}</div>
                        </template>
                    </div>
                </template>
            </div>

            <BlockFloat :onAdd="() => add(true)" :class="cls['-below']" />

        </div>
    </div>
</template>

<style lang="scss">
@use '@style/block/index';
</style>