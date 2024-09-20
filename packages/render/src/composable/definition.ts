import { computed } from "vue";
import { Node } from "bitran-dom";
import { useAreaState } from "@src/area/state";
import { useNodeName } from "./node";

export function useDefinition(node: Node)
{
    const areaState = useAreaState();
    const nodeName = useNodeName(node);

    return computed(() => {
        const definition = areaState.definitions?.[nodeName];

        if (!definition)
            throw new Error(`Missing definition for node '${nodeName}'!`);

        return definition;
    });
}