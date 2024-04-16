import IBlockMeta from "src/IBlockMeta";
import { detachMeta, parseBlockMeta, parseInlineMeta, skipFirstLine, splitByFirstLine, strToObj, textToStrBlocks } from "src/str";

describe('Split text into raw blocks', () =>
{
    type TestSet = { name: string, input: string, out: string[] }[];

    const testSet: TestSet = [
        {
            name: 'Empty string',
            input:  '',
            out:    []
        },
        {
            name:   'Simple string',
            input:  'Hello world!',
            out:    ['Hello world!']
        },
        {
            name:   'One block with multiple lines',
            input:  'My first line\nMy second line',
            out:    ['My first line\nMy second line']
        },
        {
            name:   'Complex string with line breaks and string objects',
            input:  '\n\n   \n \nHello World!\n\n@objBlock\n    property1\n\n    property2\n\n\nLast line\n',
            out: [
                'Hello World!',
                '@objBlock\n    property1\n\n    property2',
                'Last line',
            ]
        }
    ];

    for (const setItem of testSet)
    {
        test(setItem.name, () => expect(textToStrBlocks(setItem.input)).toMatchObject(setItem.out));
    }
});

describe('Split by first line', () =>
{
    const cases: [string, string, ReturnType<typeof splitByFirstLine>][] = [
        [
            'Empty line',
            '',
            { first: '', rest: '' }
        ],
        [
            'One line',
            'My first line!',
            { first: 'My first line!', rest: '' }
        ],
        [
            'Empty first line',
            '\n\nMy third line!',
            { first: '', rest: '\nMy third line!'}
        ],
        [
            'Many lines',
            'a\n\nb\nc',
            { first: 'a', rest: '\nb\nc'}
        ]
    ];

    test.each(cases)('%s', (testName, text, result) => expect(splitByFirstLine(text)).toMatchObject(result));
});

describe('Yaml parse str to obj', () =>
{
    test('Empty line', () => expect(strToObj('')).toMatchObject({}));
    test('Not an object', () => expect(() => strToObj('[5, 3, 2]')).toThrow());
    test('Literal object', () => expect(strToObj('a: b\nfoo: 5\nbar: [1, 2, 3]')).toMatchObject({a: 'b', foo: 5, bar: [1,2,3]}));
});

//
// Meta
//

describe('Inline meta', () =>
{
    const cases: [string, string, IBlockMeta][] = [
        [
            'Empty line',
            '',
            {}
        ],
        [
            'Id and classes',
            ' #myId .a .b .foo   .bar',
            { id: 'myId', classes: ['a', 'b', 'foo', 'bar'] }
        ],
        [
            'Id, classes and fast props',
            '   #id1 ..foo +bar #id2  -baz ',
            { id: 'id2', classes: ['.foo'], bar: true, baz: false }
        ]
    ];

    test.each(cases)('%s', (label, strMeta, objMeta) => expect(parseInlineMeta(strMeta)).toMatchObject(objMeta));
});

describe('Block meta', () =>
{
    const cases: [string, string, IBlockMeta][] = [
        [
            'Empty line',
            '',
            {}
        ],
        [
            'Only inline meta',
            '   #id1 ..foo +bar #id2  -baz ',
            { id: 'id2', classes: ['.foo'], bar: true, baz: false }
        ],
        [
            'Only block meta',
            'a: b\nfoo: 5\nbar: [1, 2, 3]',
            {a: 'b', foo: 5, bar: [1,2,3]}
        ],
        [
            'Inline and block meta',
            '\n\n   #id1 ..foo +bar #id2  -baz \na: "#abc b"\nfoo: 5\nbar: [1, 2, 3]',
            {id: 'id2', classes: ['.foo'], baz: false , a: '#abc b', foo: 5, bar: [1,2,3]}
        ]
    ];

    test.each(cases)('%s', (label, strMeta, objMeta) => expect(parseBlockMeta(strMeta)).toMatchObject(objMeta));
});

describe('Extract meta', () =>
{
    const cases: [string, string, ReturnType<typeof detachMeta>][] = [
        [
            'Empty line',
            '',
            { meta: {}, strBlock: '' }
        ],
        [
            'Only meta, empty block',
            '{ #abc }',
            { meta: {}, strBlock: '{ #abc }'}
        ],
        [
            'Meta not in the beginning',
            'foo\n{ #abc }\nbar',
            { meta: {}, strBlock: 'foo\n{ #abc }\nbar' }
        ],
        [
            'Inline meta',
            '{ #foo }\nMy first block!',
            { meta: { id: 'foo' }, strBlock: 'My first block!' }
        ],
        [
            'Block meta',
            '{\n    #foo\n}\nMy first block!',
            { meta: { id: 'foo' }, strBlock: 'My first block!' }
        ]
    ];

    test.each(cases)('%s', (label, strBlock, result) => expect(detachMeta(strBlock)).toMatchObject(result));
});