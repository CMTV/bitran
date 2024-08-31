<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { AreaState, areaStateKey } from './state';
import { domUpdateKey } from './domUpdate';
import { cls } from '@src/style';

import Render from '@src/render/Render.vue';

const props = defineProps<AreaState>();
const emits = defineEmits(['internalDomChange']);

//
// Setting up content area state
//

provide(areaStateKey, props);

//
// Setting up DOM update
//

const internalSymbol = ref(Symbol());

provide(domUpdateKey, {
    internalSymbol
});

watch(internalSymbol, () => {
    emits('internalDomChange');
});

//
// Rerender everything if root node was changed
//

const key = ref(1);
watch(() => props.root, () => key.value++);
</script>

<template>
    <div :class="[cls.contentArea, editMode ? cls['-editMode'] : '']">
        <Render :node="props.root" :key />
    </div>
</template>

<style lang="scss">
@use '@style/area/index';
</style>