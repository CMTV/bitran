import { DOM, Node, ParseFactory, Parser, StrFactory, Stringifier } from "bitran-dom";
import { BitranDefinition } from "./definition";

export function useBitran(definitions: Record<string, BitranDefinition>)
{
    definitions = definitions ?? {};

    const parserFactories: Record<string, new () => ParseFactory> = {};
    const strFactories: Record<string, new () => StrFactory> = {};
    const nodeTypes: Record<string, new () => Node> = {};

    for (const [nodeName, definition] of Object.entries(definitions))
    {
        parserFactories[nodeName] = definition.Parser;
        strFactories[nodeName] = definition.Stringifier;
        nodeTypes[nodeName] = definition.Node;
    }

    return {
        parser: new Parser(parserFactories),
        stringifier: new Stringifier(strFactories),
        dom: new DOM(nodeTypes),
    }
}