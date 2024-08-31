import { BlockGroupNode } from "@src/dom/group";
import { Block } from "@src/dom/product";
import { keyable, ObjBlockParseFactory, StrFactory, ObjStrFactory } from "@src/factory";

export const editorName = '#editor';

export class Editor extends Block
{
    name = editorName;

    src: string;
    content = new BlockGroupNode(this);

    get children()
    {
        return [this.content];
    }
}

const objType = 'editor';

export class EditorParser extends ObjBlockParseFactory<Editor>
{
    objType = objType;

    async parseObjBlock(obj: keyable)
    {
        if (!obj.src)
            throw new Error(`Missing editor string 'src' property!`);

        const editor = new Editor;
        editor.src = obj.src;
        editor.content.setNodes(await this.parser.parseBlocks(obj.src));

        return editor;
    }
}

export class EditorStr extends ObjStrFactory<Editor>
{
    objType = objType;

    productToObj(product: Editor): keyable
    {
        return {
            src: product.src
        }
    }
}