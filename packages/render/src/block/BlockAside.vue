<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { assumeGroupItem, Editor, Node } from 'bitran-dom';
import { cls } from '@src/style';
import { useNode } from '@src/composable/node';
import { useDefinition } from '@src/composable/definition';
import { useEditable } from '@src/composable/edit';
import { usePopup } from '@src/popup';
import { useAreaState } from '@src/area/state';
import { dragSource } from './drag';
import { useDomUpdate } from '@src/composable/domUpdate';

import PopupAside from './popup/PopupAside.vue';

const props = defineProps<{ node: Node }>();
const areaState = useAreaState();
const node = useNode(props);
const definition = useDefinition(node);
const editable = useEditable(node);
const { domUpdate } = useDomUpdate();

const aside = ref<HTMLDivElement>();
const popup = ref<HTMLElement>();

const { canShow, floatingStyles, popupActive } = usePopup(aside, popup);
watchEffect(() => canShow.value = editable.value);

//
// Drag Logic
//

onMounted(() => {
    aside.value.addEventListener('mousedown', () => {
        if (!editable.value)
            return;

        dragSource.value = {
            element: aside.value.closest('.' + cls.block),
            node,
        }

        document.documentElement.classList.add(cls['-dragging']);
    });

    aside.value.addEventListener('dblclick', () => {
        if (editable.value)
        {
            const editor = new Editor;
            editor.src = areaState.stringifier.stringify(node).trim();
            assumeGroupItem(node).replace(editor);
            domUpdate();
        }
    });
});
</script>

<template>
    <div ref="aside" :class="cls.blockAside">
        <div :class="cls.icon" v-html="definition.renderer.icon"></div>
    </div>

    <div ref="popup" v-if="popupActive" :class="[cls.popup, cls.asidePopup]" :style="floatingStyles">
        <PopupAside :node :onClosePopup="() => popupActive = false" />
    </div>
</template>