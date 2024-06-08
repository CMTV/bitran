const n={title:"Inliner meta",order:20,config:`//
// Meta will work with ANY block, ANY inliner and with ANY config!
// It is a built-in feature for annotating data.
//
// ONLY INLINE META IS ALLOWED TO USE WITH INLINERS!
//

import { defineConfig } from 'bitran-parser';

export default defineConfig({});
`,content:`You can <<annotate>>{ .wow } every inliner!
But this only works with <<inline meta>>{ got=it }, <<not block meta allowed!>>{ +sad }
`};export{n as default};
