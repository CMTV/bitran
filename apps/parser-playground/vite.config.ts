import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import parser from "./plugin/parser";
import examples from "./plugin/examples";
import yaml from "./plugin/yaml";

export default defineConfig({
    root: './app',
    cacheDir: '../.vite-cache',
    publicDir: 'public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('esbuild'))
                        return 'es-build';
                    if (id.includes('vue'))
                        return 'vue';
                    if (id.includes('codemirror'))
                        return 'codemirror';
                    if (id.includes('node_modules'))
                        return 'vendor';
                }
            }
        },
    },
    resolve: {
        alias: {
            '@app': resolve(__dirname, './app')
        }
    },
    plugins: [vue(), parser(), examples(), yaml()]
});