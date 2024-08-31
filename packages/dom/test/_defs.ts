import { Node } from "@src/index";

let key = 0;
export class FooNode extends Node {
    name = 'foo';
    get children() { return []; }

    key: number;
    constructor()
    {
        super();
        this.key = key++;
    }
}