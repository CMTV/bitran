import { BlockParseFactory, ParseFactory, StrFactory } from "bitran-dom";
import Math from "./node";

export class MathParse extends BlockParseFactory<Math>
{
    canParse(strBlock: string): boolean
    {
        return strBlock.startsWith('$$ ') && strBlock.endsWith(' $$');
    }

    async parseProduct(strBlock: string): Promise<Math>
    {
        const math = new Math;
        math.latex = strBlock.slice(2, -2);
        return math;
    }
}

export class MathStr extends StrFactory<Math>
{
    stringify(node: Math): string
    {
        return `$$ ${node.latex} $$`;
    }
}