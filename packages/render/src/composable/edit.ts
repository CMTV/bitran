import { computed, ref, Ref } from "vue";
import { Editor, Node } from "bitran-dom";
import { useAreaState } from "@src/area/state";
import { useDomUpdate } from "./domUpdate";

export function useEditMode()
{
    const areaState = useAreaState();
    return computed(() => areaState.editMode);
}

export function useInsideEditor(node: Node)
{
    function isInsideEditor()
    {
        let inside = false;

        node.walkUp(upNode => {
            if (upNode instanceof Editor)
                return !(inside = true);
        });

        return inside;
    }

    const insideEditor = ref<boolean>(isInsideEditor());

    const { onDomUpdate } = useDomUpdate();
    onDomUpdate(() => insideEditor.value = isInsideEditor());

    return insideEditor;
}

export function useEditable(node: Node)
{
    const editMode = useEditMode();
    const insideEditor = useInsideEditor(node);
    return computed(() => editMode.value && !insideEditor.value);
}