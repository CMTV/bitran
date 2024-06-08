# Bitran Parser

Bitran **Parser** — highly customizable text parser for converting structured text into programming-friendly user defined objects: blocks and inliners.
These blocks and inliners can later be easily analyzed or used in rendering (for example in HTML).

**Important:** in Bitran translation process of converting text to fancy rendered stuff the **Parser** (current package) is responsible **only for parsing** — transforming text into abstract object products: blocks and inliners. Later on, Bitran **Renderer** takes these abstract products and renders into something fancy.

**Key features:**

* User defined blocks and inliners
* Support of text blocks written in YAML language
* Infinite nesting of blocks and inliners
* Flexible and useful meta syntax for blocks and inliners
* Built-in ID assignment and error handling
* Custom parse workers support

## What it does?

Out of the box Bitran Parser with zero config is capable of converting this text:

```
Just a <<simple>>{ .baz #inilnerId } paragraph.

{ #myId .class1 +foo -bar }
Paragraph with inline meta.

{
    #id2
    refs:
        - a
        - b
        - false
}
Paragraph with combination of YAML-structured block and inline meta.
```

<details>
    <summary>Into this JSON</summary>

```json
{
  "workerResults": {
    "id": [
      "span:inilnerId",
      "paragraph:myId",
      "paragraph:id2"
    ],
    "error": []
  },
  "rootProducts": {
    "_pids": [
      "auto:paragraph:1",
      "paragraph:myId",
      "paragraph:id2"
    ]
  },
  "products": {
    "auto:text:1": {
      "id": "auto:text:1",
      "name": "text",
      "data": "simple",
      "type": "inliner"
    },
    "auto:text:2": {
      "id": "auto:text:2",
      "name": "text",
      "data": "Just a ",
      "type": "inliner"
    },
    "span:inilnerId": {
      "id": "span:inilnerId",
      "name": "span",
      "meta": {
        "id": "inilnerId",
        "classes": [
          "baz"
        ]
      },
      "data": {
        "_pids": [
          "auto:text:1"
        ]
      },
      "type": "inliner"
    },
    "auto:text:3": {
      "id": "auto:text:3",
      "name": "text",
      "data": " paragraph.",
      "type": "inliner"
    },
    "auto:paragraph:1": {
      "id": "auto:paragraph:1",
      "name": "paragraph",
      "data": {
        "_pids": [
          "auto:text:2",
          "span:inilnerId",
          "auto:text:3"
        ]
      },
      "type": "block"
    },
    "auto:text:4": {
      "id": "auto:text:4",
      "name": "text",
      "data": "Paragraph with inline meta.",
      "type": "inliner"
    },
    "paragraph:myId": {
      "id": "paragraph:myId",
      "name": "paragraph",
      "meta": {
        "id": "myId",
        "classes": [
          "class1"
        ],
        "foo": true,
        "bar": false
      },
      "data": {
        "_pids": [
          "auto:text:4"
        ]
      },
      "type": "block"
    },
    "auto:text:5": {
      "id": "auto:text:5",
      "name": "text",
      "data": "Paragraph with combination of YAML-structured block and inline meta.",
      "type": "inliner"
    },
    "paragraph:id2": {
      "id": "paragraph:id2",
      "name": "paragraph",
      "meta": {
        "id": "id2",
        "refs": [
          "a",
          "b",
          false
        ]
      },
      "data": {
        "_pids": [
          "auto:text:5"
        ]
      },
      "type": "block"
    }
  }
}
```
</details>

## In-depth examples

Detailed examples with configs, input texts and parse results can be found inside [`examples`](./examples/) folder:

* [Zero config](./examples/zeroConfig/)
* [Custom blocks and inliners](./examples/customBlockInliner/)
* [Custom parse worker](./examples/customParseWorker/)
* [Context usage](./examples/contextUsage/)