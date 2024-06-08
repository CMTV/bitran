import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external(id) {
                if (['yaml'].includes(id))
                    return true;

                return id.startsWith('node:');
            },
        },
    },
});
