import { ref } from "vue";
import { assumeGroupItem, Node } from "bitran-dom";
import { cls } from "@src/style";

export enum DragTargetPosition
{
    Above = 'Above',
    Below = 'Below',
}

export interface DragSource
{
    element: HTMLElement;
    node: Node;
}

export interface DragTarget
{
    position: DragTargetPosition;
    node: Node;
}

export const dragSource = ref<DragSource>();
export const dragTarget = ref<DragTarget>();

export function clearDragData()
{
    dragSource.value = undefined;
    dragTarget.value = undefined;
}

export function doDrag()
{
    if (dragSource.value.node.parent === dragTarget.value.node.parent)
    {
        // Move
        assumeGroupItem(dragSource.value.node).move(dragTarget.value.node, dragTarget.value.position === DragTargetPosition.Above);
    }
    else
    {
        // Detach and Insert
        dragTarget.value.position === DragTargetPosition.Above ? assumeGroupItem(dragTarget.value.node).before(dragSource.value.node) : assumeGroupItem(dragTarget.value.node).after(dragSource.value.node);
    }
}

window.addEventListener('mouseup', () => {
    document.documentElement.classList.remove(cls['-dragging']);
    clearDragData();
});