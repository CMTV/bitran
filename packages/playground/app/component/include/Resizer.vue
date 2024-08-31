<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits<{ move: [shift: { x: number, y: number } ], reset: [] }>();
const resizer = ref<HTMLDivElement>();

onMounted(() =>
{
    if (!resizer.value) return;

    resizer.value.addEventListener('dblclick', () => emit('reset'));
    resizer.value.addEventListener('pointerdown', resizeStart);

    document.addEventListener('pointerup', resizeEnd);

    function resizeMove(e: PointerEvent)
    {
        emit('move', { x: e.movementX, y: e.movementY });
    }

    function resizeStart()
    {
        document.addEventListener('pointermove', resizeMove);
    }

    function resizeEnd()
    {
        document.removeEventListener('pointermove', resizeMove);
    }
});
</script>

<template>
    <div ref="resizer" class="select-none touch-none"></div>
</template>