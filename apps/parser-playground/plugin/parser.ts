import { type Plugin } from "vite";

export default function parser(): Plugin {
    const moduleName = 'local-bitran-parser';
    let serveMode = false;

    return {
        name: moduleName,
        configResolved(config) {
            serveMode = config.command === 'serve';
        },
        resolveId(id) {
            if (id === moduleName)
                return moduleName;
        },
        load(id) {
            if (id === moduleName)
                return 'export * from "bitran-parser"';
        },
        buildStart() {
            if (!serveMode)
                this.emitFile({
                    type: 'chunk',
                    fileName: 'parser.js',
                    id: moduleName,
                    preserveSignature: 'exports-only'
                })
        }
    }
}