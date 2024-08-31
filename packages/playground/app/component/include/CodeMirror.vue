<script setup lang="ts">
// CodeMirror

import {
    EditorView,
    keymap,
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    highlightActiveLine,
    drawSelection,
} from '@codemirror/view';

import {
    defaultKeymap,
    history,
    historyKeymap,
    indentWithTab
} from '@codemirror/commands';

import {
    LanguageSupport,
    defaultHighlightStyle,
    foldGutter, indentUnit,
    syntaxHighlighting
} from '@codemirror/language';

import { Compartment, EditorState } from '@codemirror/state';

import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark';

// Other imports

import { onMounted, ref, watch } from 'vue';

//
// Editor config
//

const props = defineProps<{
    readonly?:  boolean;
    darkMode?:  boolean;
    lang?:      LanguageSupport;
}>();

const emit = defineEmits<{
    (e: 'internalInput', newDoc: string): void
}>();

const externalDoc = defineModel<string>('doc');
const internalDoc = ref(externalDoc.value);

const readonly =    new Compartment;
const editable =    new Compartment;
const lang =        new Compartment;
const theme =       new Compartment;

const extensions = [

    // Default

    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    foldGutter(),
    drawSelection(),
    history(),
    highlightActiveLine(),
    keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        indentWithTab,
        { key: 'Mod-s', preventDefault: true } // Prevent accident saving
    ]),
    indentUnit.of('    '),

    //

    lang.of(props.lang ?? []),
    readonly.of(EditorState.readOnly.of(props.readonly)),
    editable.of(EditorView.editable.of(!props.readonly)),
    theme.of(getTheme(props.darkMode)),

    //

    EditorView.updateListener.of(e => {
        if (e.docChanged)
            internalDoc.value = editor.state.doc.toString();
    }),
];

//
// Setting up the editor
//

const editorHolder = ref<HTMLDivElement>();
let editor: EditorView;

onMounted(() => {
    editor = new EditorView({
        doc: internalDoc.value,
        extensions,
        parent: editorHolder.value,
    });
});

watch(() => props.readonly, () => {
    editor.dispatch({
        effects: [
            readonly.reconfigure(EditorState.readOnly.of(props.readonly)),
            editable.reconfigure(EditorView.editable.of(!props.readonly))
        ]
    });
});

watch(() => props.lang, () => {
    editor.dispatch({
        effects: lang.reconfigure(props.lang ?? [])
    });
});

watch(() => props.darkMode, () => {
    editor.dispatch({
        effects: theme.reconfigure(getTheme(props.darkMode))
    });
});

function getTheme(isDark: boolean)
{
    const extensions = [EditorView.theme({}, { dark: isDark })];
    extensions.push(syntaxHighlighting(isDark ? oneDarkHighlightStyle : defaultHighlightStyle));

    return extensions;
}

watch(
    [externalDoc, internalDoc],
    ([newExternal, newInternal], [oldExternal, oldInternal]) => {
        const externalChanged = newExternal !== oldExternal;
        const internalChanged = newInternal !== oldInternal;

        const outsideChange = externalChanged && newExternal !== newInternal;

        if (outsideChange)
        {
            editor.dispatch({
                changes: {
                    from: 0,
                    to: editor.state.doc.length,
                    insert: newExternal
                }
            });
        }

        const insideChange = internalChanged && newInternal !== newExternal;

        if (insideChange)
        {
            externalDoc.value = newInternal;
            emit('internalInput', newInternal);
        }
    }
)
</script>

<template>
    <div ref="editorHolder" :class="$style.cm"></div>
</template>

<style module lang="scss">
@use '@app/style/_global';

@mixin cmRules
{

    & * {
        outline: none;
    }

    .cm-editor
    {
        @apply h-full bg-neutral-50 dark:bg-neutral-900;

        &:not(.cm-focused)
        {
            .cm-activeLine,
            .cm-activeLineGutter
            {
                @apply bg-transparent;
            }
        }
    }

    .cm-scroller
    {
        @apply overflow-auto;
        @include global.injectScroll;
    }

    .cm-gutters
    {
        @apply dark:bg-neutral-900 text-[var(--textShade3)];
        border-right: 1px solid var(--stroke);
    }

    .cm-activeLine,
    .cm-activeLineGutter
    {
        @apply bg-neutral-500/10;
    }
}

.cm
{
    @apply h-full;
    :global { @include cmRules; }
}
</style>