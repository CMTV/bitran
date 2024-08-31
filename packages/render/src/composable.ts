import { computed, ref, toRef, watch } from "vue";
import { Editor, ErrorNode } from "bitran-dom";
import { getPhrases, usePhrases as _usePhrases } from "bitran-use";
import { useAreaState } from "./area/state";
import { RenderProps } from "./render/RenderProps";
import { useDomUpdate } from "./composable/domUpdate";

export function useNode<TRenderProps extends RenderProps>(props: TRenderProps)
{
    return toRef(props, 'node');
}

export function useNodeName(props: RenderProps)
{
    return computed(() => props.node instanceof ErrorNode ? props.node.target : props.node.name);
}

export function useDefinition(props: RenderProps)
{
    const areaState = useAreaState();
    const nodeName = useNodeName(props);

    return computed(() => {
        const definition = areaState.definitions?.[nodeName.value];

        if (!definition)
            throw new Error(`Missing definition for node '${nodeName}'!`);

        return definition;
    });
}

export async function usePhrases(props: RenderProps)
{
    const areaState = useAreaState();
    const definition = useDefinition(props);
    const fPhrase = ref<ReturnType<typeof _usePhrases>>(() => '');

    watch(() => areaState.language, async () => {
        const phrases = await getPhrases(areaState.language, definition.value.phraseLoader);
        fPhrase.value = _usePhrases(phrases);
    }, { immediate: true });

    return fPhrase;
}

export function useEditMode()
{
    const areaState = useAreaState();
    return computed(() => areaState.editMode);
}

export function useInsideEditor(props: RenderProps)
{
    const insideEditor = ref<boolean>();

    const node = useNode(props);
    const { onDomUpdate } = useDomUpdate();

    function checkInsideEditor()
    {
        let isInside = false;

        node.value.walkUp(upNode => {
            if (upNode instanceof Editor)
            {
                isInside = true;
                return false;
            }
        });

        return isInside;
    }

    onDomUpdate(() => insideEditor.value = checkInsideEditor());
    insideEditor.value = checkInsideEditor();

    return insideEditor;
}