import { Block, BlockGroupNode, Node } from "bitran-dom";

export default class Definition extends Block
{
    content = new BlockGroupNode(this);

    get children(): Node[]
    {
        return [this.content];
    }
}