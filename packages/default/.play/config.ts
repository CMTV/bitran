import { defineConfig } from "bitran-playground";
import span from '../src/inliner/span';

import testDefinitions from '../test';

export default defineConfig({
    title: 'Bitran Defaults',
    definitions: {
        span,
        ...testDefinitions
    }
});