import { ErrorNode } from "@src/dom/error";
import { Parser } from "@src/parse";
import { Stringifier } from "@src/stringify";

const parser = new Parser({});
const stringifier = new Stringifier({});

const text = `

This is my paragraph!

@editor
    content: |


        This is text.


        All formatting is kept!      Even many spaces!

The editor below fill fail the parsing process:

@editor
    foo: bar

`.trim();

const doc = await parser.parse(text);

test('Errored parser', () => {
    expect(doc.children.at(-1)).toBeInstanceOf(ErrorNode);
});

const strDoc = stringifier.stringify(doc);

test('Editor keep source untouched', () => {
    expect(strDoc).toBe(`

This is my paragraph!

@editor
    content: |


        This is text.


        All formatting is kept!      Even many spaces!

The editor below fill fail the parsing process:

@editor
    foo: bar`.trimStart());
});