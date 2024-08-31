import { Node } from "bitran-dom";

export interface RenderProps<TNode extends Node = Node>
{
    node: TNode;
}