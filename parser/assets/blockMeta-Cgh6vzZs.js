const n={title:"Block meta",order:10,config:`//
// Meta will work with ANY block, ANY inliner and with ANY config!
// It is a built-in feature for annotating data.
//

import { defineConfig } from 'bitran-parser';

export default defineConfig({});
`,content:`{ #myP .class1 .class2 +good -bad prop1=foo prop2=bar }
Paragraph with inline meta.

{
    good: true
    todo:
        - Wake up
        - Play computer games
        - Go to sleep
    search:
        seo-title: Cool paragraph!
}
Paragraph with block meta.

{
    #inlineMeta
    blockMeta: "some complex stuff"
}
Paragraph with both inline and block metas.
Inline meta must come fist!
`};export{n as default};
