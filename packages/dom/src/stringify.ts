import { StrFactory } from "./factory";
import { stringifyMeta } from "./dom/meta";
import { Block, Inliner } from "./dom/product";
import { ErrorNode } from "./dom/error";
import { BlockGroupNode, GroupNode, InlinerGroupNode } from "./dom/group";
import { Node } from "./dom/node";
import { textName, TextStr } from "./default/text";
import { paragraphName, ParagraphStr } from "./default/paragraph";
import { editorName, EditorStr } from "./default/editor";

export class Stringifier
{
    private strFactories: Record<string, new () => StrFactory>;

    constructor(strFactories: Record<string, new () => StrFactory>)
    {
        this.strFactories = strFactories;

        this.strFactories[editorName] = EditorStr;
        this.strFactories[paragraphName] = ParagraphStr;
        this.strFactories[textName] = TextStr;
    }

    stringify(node: Node): string
    {
        //
        // Technical nodes
        //

        if (node instanceof ErrorNode)
            return node.src;

        if (node instanceof BlockGroupNode)
            return node.children.map(childNode => this.stringify(childNode)).join('\n\n');

        if (node instanceof InlinerGroupNode)
            return node.children.map(childNode => this.stringify(childNode)).join('');

        //
        // Defined nodes
        //

        const Factory = this.strFactories[node.name];

        if (!Factory)
            return `!!! Missing stringifier for node '${node.name}' !!!`;

        const factory = new Factory;
        factory.stringifier = this;

        const strNode = factory.stringify(node);

        if (node instanceof Block)
        {
            const strMeta = stringifyMeta(node.meta, true);
            return strMeta + (strMeta ? '\n' : '') + strNode;
        }
        else if (node instanceof Inliner)
        {
            return strNode + stringifyMeta(node.meta, false);
        }
    }
}