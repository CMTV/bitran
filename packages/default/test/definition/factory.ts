import { keyable, ObjBlockParseFactory, ObjStrFactory } from "bitran-dom";
import Definition from "./node";

const objType = 'definition';

export class DefinitionParser extends ObjBlockParseFactory<Definition>
{
    objType = objType;

    async parseObjBlock(obj: keyable): Promise<Definition>
    {
        const definition = new Definition;

        if (!obj.content)
            throw new Error('Missing at "content" property!');

        definition.content.setNodes(await this.parser.parseBlocks(obj.content));

        return definition;
    }
}

export class DefinitionStr extends ObjStrFactory<Definition>
{
    objType = objType;

    productToObj(product: Definition): keyable
    {
        const obj = {
            content: this.stringifier.stringify(product.content)
        };

        return obj;
    }
}