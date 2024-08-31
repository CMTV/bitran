import { unlinkSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        target: 'esnext',
        minify: false,
        sourcemap: true,
        rollupOptions: {
            preserveEntrySignatures: 'exports-only',
            input: {
                index: resolve(__dirname, 'src/index.ts'),
                cli: resolve(__dirname, 'src/cli/index.ts'),
            },
            output: {
                format: 'es',
                entryFileNames(chunkInfo)
                {
                    switch (chunkInfo.name)
                    {
                        case 'index':   return 'index.js';
                        case 'cli':     return 'cli.js';

                        default: return chunkInfo.name;
                    }
                },
            },
            external(id) {
                return !(
                    // Include bitran since it has monorepo dependency?
                    isAbsolute(id) ||
                    id.startsWith('.') ||
                    id.startsWith('..')
                );
            },
        }
    },
    /* TODO: Dirty hacks, think of something more clever! */
    plugins: [
        {
            ...dts({ rollupTypes: true, exclude: 'app/**/*'}),
            load(id) { if (id.includes('cli/index.ts')) return; }
        },
        {
            name: 'remove cli.d.ts',
            closeBundle() {
                try { unlinkSync('./dist/cli.d.ts'); } catch {}
            },
        }
    ]
});