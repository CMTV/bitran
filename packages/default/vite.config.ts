import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { glob } from 'glob';

import pkg from './package.json';
import { extname, relative } from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
    build: {
        minify: false,
        sourcemap: true,
        lib: {
            // entry: 'src/index.ts',
            // fileName: 'index',
            formats: ['es'],
            entry: {
                index: 'src/index.ts',
            }
        },
        rollupOptions: {
            input: Object.fromEntries(
                glob.sync('src/**/*.ts', { ignore: 'src/vite-env.d.ts' }).map(file => [
                    relative(
                        'src',
                        file.slice(0, file.length - extname(file).length)
                    ),
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                chunkFileNames: '_chunks/[name].[hash].js',
                assetFileNames: '_assets/[name][extname]',
                entryFileNames: '[name].js',
            },
            external: Object.keys({ ...pkg?.['dependencies'], ...pkg?.['peerDependencies'] }),
        },
    },
    plugins: [
        tsconfigPaths(),
        libInjectCss(),
        vue(),
        dts({ rollupTypes: true }),
    ]
});