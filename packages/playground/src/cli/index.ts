#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { argv } from "node:process";
import { InlineConfig, build, createServer, normalizePath, preview } from "vite";
import chalk from "chalk";
import vue from '@vitejs/plugin-vue';
import { PG_CONTEXT, setupNewContext } from "./context";
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import content from "./plugin/content";
import markdown from "vite-plugin-md";

console.log(chalk.blue.bold('\nBitran Playground') + ' 🛝');

setupNewContext({
    mode:           getPlaygroundMode(),
    playgroundRoot: normalizePath(resolve(fileURLToPath(import.meta.url), '../..')),
    productsRoot:   normalizePath(process.cwd()),
});

const productsPlay = resolve(PG_CONTEXT.productsRoot, '.play');

printOption('Mode',         chalk.cyan(PG_CONTEXT.mode));
printOption('Playground',   chalk.gray(PG_CONTEXT.playgroundRoot));
printOption('Products',     chalk.gray(PG_CONTEXT.productsRoot));

console.log('\n' + chalk.italic.gray('Starting Vite...') + '\n');

const config = <InlineConfig> {
    configFile: false,
    mode: ['build', 'preview'].includes(PG_CONTEXT.mode) ? 'production' : 'development',
    root: resolve(PG_CONTEXT.playgroundRoot, 'app'),
    publicDir: resolve(PG_CONTEXT.playgroundRoot, 'app', 'public'),
    cacheDir: resolve(productsPlay, '.cache'),
    resolve: {
        alias: {
            '@products': resolve(PG_CONTEXT.productsRoot, ''),
            '@app': resolve(PG_CONTEXT.playgroundRoot, './app')
        }
    },
    build: {
        emptyOutDir: true,
        outDir: resolve(productsPlay, 'dist'),
        rollupOptions: {
            output: {
                manualChunks: id => {
                    if (id.includes('icon'))
                        return 'icon';
                    if (id.includes('codemirror'))
                        return 'codemirror';
                    if (id.includes('yaml'))
                        return 'yaml';
                    if (id.includes('node_modules'))
                    {
                        return 'vendor';
                    }
                }
            }
        }
    },
    server: {
        port: 7000,
        host: true,
    },
    css: {
        postcss: {
            plugins: [
                tailwind(resolve(PG_CONTEXT.playgroundRoot + '/tailwind.config.ts')),
                autoprefixer()
            ]
        }
    },
    plugins: [
        {
            name: 'watch-restart',
            configureServer(server) {
                function onAddDelete()
                {
                    console.log(chalk.gray.italic('\nPlayground changed! Restarting...\n'));
                    server.restart();
                }

                server.watcher.add(PG_CONTEXT.productsRoot);
                server.watcher.on('add', onAddDelete);
                server.watcher.on('unlink', onAddDelete);
            }
        },
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        content(),
        markdown(),
    ]
}

switch (PG_CONTEXT.mode)
{
    case 'build':
        await _build();
        break;
    case 'preview':
        await _preview();
        break;
    case 'serve':
        await _serve();
        break;
}

//
//
//

async function _build()
{
    await build(config);
}

async function _serve()
{
    const viteServer = await createServer(config);
    await viteServer.listen();

    viteServer.printUrls();
    viteServer.bindCLIShortcuts({ print: true });
}

async function _preview()
{
    const previewServer = await preview(config);
    previewServer.printUrls();
    previewServer.bindCLIShortcuts({ print: true });
}

//
//
//

function getPlaygroundMode()
{
    const inCommand = [...argv].slice(2).pop() || 'serve';

    if (!['build', 'serve', 'preview'].includes(inCommand))
        throw new Error(chalk.red(`Unknown command '${inCommand}'!`));

    return inCommand;
}

function printOption(label: string, value: string)
{
    console.log(chalk.bold(label + ':'), value);
}