import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import * as sass from 'sass';

import pkg from './package.json';

import { prefix } from './src/style';

export default defineConfig({
    build: {
        minify: false,
        copyPublicDir: true,
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
    define: {
        "__CLASS__": 'bitran',
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                functions: {
                    '_($className)': args => new sass.SassString(`.${prefix}-` + args[0])
                }
            }
        }
    },
    resolve: {
        alias: {
            '$public': resolve(__dirname, './public/scss'),
            '@style': resolve(__dirname, './style'),
            '@src': resolve(__dirname, './src'),
        }
    },
    plugins: [
        vue(),
        dts({ rollupTypes: true }),
    ]
});