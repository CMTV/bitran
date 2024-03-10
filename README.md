# Bitran

Bitran (**B**lock & **i**nliner **tran**slator) is a tool to parse text into JSON structured blocks and inliners.<br>
Paragraph blocks and plain text inliners are supported by default.<br>
All other block and inliners must be configured manually!

## Example "out of the box"

Raw text:

```
This is paragraph one!

Second paragraph!
```

Parsed result:

```json
[
    {
        "__type": "block",
        "__name": "paragraph",
        "content": [
            {
                "__type": "inliner",
                "__name": "text",
                "content": "This is paragraph one!"
            }
        ]
    },

    {
        "__type": "block",
        "__name": "paragraph",
        "content": [
            {
                "__type": "inliner",
                "__name": "text",
                "content": "Second paragraph!"
            }
        ]
    }
]
```