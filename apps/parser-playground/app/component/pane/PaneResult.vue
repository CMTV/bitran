<script setup lang="ts">
import Pane from './Pane.vue';
import CodeMirror from '@app/component/include/CodeMirror.vue';
import { useStateStore } from '@app/store/state';
import { ref } from 'vue';
import { Parser } from 'bitran-parser';
import YAML from 'yaml';
import { yaml } from '@codemirror/lang-yaml';
import { initialize as esInit, transform as esTransform } from 'esbuild-wasm';
import { Pane as UiPane } from '@app/store/ui';

const state = useStateStore();

const loading = ref(true);
const error = ref<Error>();

//
// Watching for 'render' call on 'state' store
//

let delayTimeout;
state.$onAction(action => {
    if (action.name === 'render')
    {
        recreateParser = recreateParser || action.args[1];
        clearTimeout(delayTimeout);
        delayTimeout = setTimeout(() => {
            renderResult();
        }, action.args[0]);
    }
});

//
// Render mechanism
//

let renderRequestId = 0;
let recreateParser: boolean;
let createEsbuild = true;
let parser: Parser;

const resultStr = ref('');

async function renderResult()
{
    let currentRequestId = ++renderRequestId;

    loading.value = true;

    //await new Promise(resolve => setTimeout(resolve, 2000));

    let result;

    function handleError(e) {
        error.value = e;
        result = e?.stack ?? e?.toString() ?? e;
    }

    if (createEsbuild)
    {
        const wasm = await import('esbuild-wasm/esbuild.wasm?url');
        await esInit({ wasmURL: wasm.default });
        createEsbuild = false;
    }

    if (recreateParser)
    {
        try {
            const moduleCode = (await esTransform(replaceImports(state.config), { loader: 'ts' })).code;
            const configModule = await import(/* @vite-ignore */'data:text/javascript;base64,' + toBase64(moduleCode));
            parser = new Parser(configModule.default);
            recreateParser = false;
            error.value = null;
        }
        catch (e) { handleError(e) }
    }

    if (!error.value)
        result = await parser.parse(state.content);

    if (currentRequestId !== renderRequestId)
        return;

        resultStr.value = YAML.stringify(result, null, 4);
    loading.value = false;
}

function replaceImports(configStr: string)
{
    return configStr.replace(/(import\s+(?:{[^{}]+}|.*?)\s*(?:from)?)\s*['"](.*?)['"]|import\(.*?\)/g, (match, begin, target) =>
    {
        if (target === 'bitran-parser')
            target = location.origin + (import.meta.env.MODE === 'development' ? '/@id/local-bitran-parser' : '/parser.js');

        return begin + ' ' + `"${target}"`;
    })
}

function toBase64(str: string)
{
    function bytesToBase64(bytes) {
        const binString = Array.from(bytes, (byte: any) =>
            String.fromCodePoint(byte),
        ).join("");
        return btoa(binString);
    }

    return bytesToBase64(new TextEncoder().encode(str));
}
</script>

<template>
    <Pane :pane="UiPane.Result" title="Parse Result" icon="json-obj" class="bg-neutral-100">
        <template #header>
            <div class="h-full flex items-center justify-end pr-3">
                <i
                    class="i-arrows-circle animate-spin opacity-1 transition-opacity duration-default text-neutral-500 text-[20px]"
                    :class="{ 'opacity-0': !loading }">
                </i>
            </div>
        </template>

        <template #default>
            <CodeMirror
                v-model:doc="resultStr"
                :lang="yaml()"
                :readonly="true"
                class="transition-[background] duration-default"
                :class="{ 'bg-red-200': error }" />
        </template>
    </Pane>
</template>