import { computed, ref, Ref, shallowRef, toRef } from "vue";
import { ErrorNode, Node } from "bitran-dom";
import { RenderProps } from "@src/render/RenderProps";

export function useNode<TRenderProps extends RenderProps>(props: TRenderProps)
{
    return props.node as TRenderProps['node'];
}

export function useNodeName(node: Node)
{
    return node instanceof ErrorNode ? node.target : node.name;
}