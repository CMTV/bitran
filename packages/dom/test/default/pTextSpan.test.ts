import { DOM } from "@src/dom";
import { Parser } from "@src/parse";
import { Stringifier } from "@src/stringify";
import { Span, SpanParser, SpanStr } from "@src/default/span";
import { RootNode } from "@src/dom/group";
import { Text } from "@src/default/text";
import { Paragraph } from "@src/default/paragraph";

const dom = new DOM({
    span: Span,
});

const parser = new Parser({
    span: SpanParser,
});

const stringifier = new Stringifier({
    span: SpanStr,
});

// root
// ├── p1
// │   ├── t1
// │   ├── s1
// │   │   ├── t2
// │   │   ├── s2
// │   │   │   └── t3
// │   │   └── t4
// │   └── t5
// ├── p2
// │   ├── t6
// │   └── s3
// │       └── t7
// └── p3
//     └── t8

const t1 = new Text; t1.content = 't1';
const t2 = new Text; t2.content = 't2';
const t3 = new Text; t3.content = 't3';
const t4 = new Text; t4.content = 't4';
const t5 = new Text; t5.content = 't5';
const t6 = new Text; t6.content = 't6';
const t7 = new Text; t7.content = 't7';
const t8 = new Text; t8.content = 't8';

const s1 = dom.create('span');
s1.meta = { id: 'myS2', good: true }

const s2 = dom.create('span');
s2.meta = { s2: -69, prop: 'val' };
s2.content.setNodes(t3);

s1.content.setNodes(t2, s2, t4);

const p1 = new Paragraph;
p1.meta = {
    classes: ['cls1', 'cls2']
}
p1.content.setNodes(t1, s1, t5);

const s3 = dom.create('span');
s3.content.setNodes(t7);

const p2 = new Paragraph;
p2.meta = {
    deep: {
        property: 'value'
    }
}
p2.content.setNodes(t6, s3);

const p3 = new Paragraph;
p3.content.setNodes(t8);

const doc = new RootNode;
doc.setNodes(p1, p2, p3);

//
//
//

const strDoc = stringifier.stringify(doc);

test('Stringify', () => {
    expect(strDoc).toBe(`

{ .cls1 .cls2 }
t1<<t2<<t3>>{ s2=-69 prop=val }t4>>{ #myS2 +good }t5

{
    deep:
        property: value
}
t6<<t7>>

t8
`.trim());
});

const parsedDoc = await parser.parse(strDoc);

test('Parse', () => {
    expect(parsedDoc).toEqual(doc);
});