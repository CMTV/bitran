import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig({
    build: {
        minify: false,
        sourcemap: true,
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: Object.keys({ ...pkg?.['dependencies'], ...pkg?.['peerDependencies'] }),
        },
    },
    plugins: [
        tsconfigPaths(),
        dts({ rollupTypes: true }),
    ]
});