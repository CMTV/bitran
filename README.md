# Bitran

Bitran (_**B**lock & **i**nliner **tran**slator_) is a highly customizable parser for converting structured text into programming-friendly user defined objects: blocks and inliners.
These blocks and inliners can later be easily analyzed or used in rendering (e.x. in HTML).

**Key features:**

* User defined blocks and inliners
* YAML structured blocks structure support
* Infinite nesting of blocks and inliners
* Flexible and useful block meta syntax
* Built-in ID assignment and error handling
* Custom parse workers support

## Zero config example

Out of the box Bitran with zero config is capable of converting this text:

```
Just a paragraph.

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
    "products": {
        "auto:text:1": {
            "id": "auto:text:1",
            "name": "text",
            "data": "Just a paragraph.",
            "type": "inliner"
        },
        "auto:paragraph:1": {
            "id": "auto:paragraph:1",
            "name": "paragraph",
            "data": {
                "__pids": [
                    "auto:text:1"
                ]
            },
            "type": "block",
            "meta": {}
        },
        "auto:text:2": {
            "id": "auto:text:2",
            "name": "text",
            "data": "Paragraph with inline meta.",
            "type": "inliner"
        },
        "paragraph:myId": {
            "id": "paragraph:myId",
            "name": "paragraph",
            "data": {
                "__pids": [
                    "auto:text:2"
                ]
            },
            "type": "block",
            "meta": {
                "id": "myId",
                "classes": [
                    "class1"
                ],
                "foo": true,
                "bar": false
            }
        },
        "auto:text:3": {
            "id": "auto:text:3",
            "name": "text",
            "data": "Paragraph with combination of YAML-structured block and inline meta.",
            "type": "inliner"
        },
        "paragraph:id2": {
            "id": "paragraph:id2",
            "name": "paragraph",
            "data": {
                "__pids": [
                    "auto:text:3"
                ]
            },
            "type": "block",
            "meta": {
                "id": "id2",
                "refs": [
                    "a",
                    "b",
                    false
                ]
            }
        }
    },
    "rootBlocks": {
        "__pids": [
            "auto:paragraph:1",
            "paragraph:myId",
            "paragraph:id2"
        ]
    },
    "pwResults": {
        "id": [
            "paragraph:myId",
            "paragraph:id2"
        ],
        "error": []
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