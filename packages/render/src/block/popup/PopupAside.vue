<script setup lang="ts">
import { assumeGroupItem, Editor } from 'bitran-dom';
import { RenderProps } from '@src/render/RenderProps';
import { useAreaState } from '@src/area/state';
import { useDomUpdate } from '@src/composable/domUpdate';
import { useEditMode } from '@src/composable/edit';
import { useNode } from '@src/composable/node';

import AsideItem from './aside/AsideItem.vue';

import editIcon from './aside/edit.svg?raw';
import cloneIcon from './aside/clone.svg?raw';
import removeIcon from './aside/remove.svg?raw';

import linkIcon from './aside/link.svg?raw';

const props = defineProps<RenderProps>();

const emits = defineEmits(['closePopup']);

const areaState = useAreaState();
const editMode = useEditMode();
const node = useNode(props);
const { domUpdate } = useDomUpdate();

function closePopup()
{
    emits('closePopup');
}

//
// Edit Mode Actions
//

function edit()
{
    const editor = new Editor;
    editor.src = areaState.stringifier.stringify(node).trim();
    assumeGroupItem(node).replace(editor);
    domUpdate();
}

async function clone()
{
    const strNode = areaState.stringifier.stringify(node);
    const newNodes = await areaState.parser.parseBlocks(strNode);
    assumeGroupItem(node).after(...newNodes);
    domUpdate();
    closePopup();
}

function remove()
{
    assumeGroupItem(node).detach();
    domUpdate();
}
</script>

<template>
        <template v-if="editMode">
            <AsideItem @click="edit" :icon="editIcon" label="Изменить" />
            <AsideItem @click="clone" :icon="cloneIcon" label="Клонировать" />
            <AsideItem @click="remove" :icon="removeIcon" label="Удалить" />
        </template>
        <template v-else>
            <AsideItem :icon="linkIcon" label="Копировать ссылку" />
        </template>
</template>