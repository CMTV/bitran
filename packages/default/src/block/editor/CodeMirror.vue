<script setup lang="ts">
// CodeMirror

import {
    EditorView,
    keymap,
    highlightActiveLineGutter,
    highlightSpecialChars,
    highlightActiveLine,
    highlightWhitespace,
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
const theme =       new Compartment;

const extensions = [

    // Default

    highlightActiveLineGutter(),
    highlightSpecialChars(),
    foldGutter(),
    drawSelection(),
    history(),
    highlightActiveLine(),
    highlightWhitespace(),

    keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        indentWithTab,
        { key: 'Mod-s', preventDefault: true } // Prevent accident saving
    ]),
    indentUnit.of('    '),

    EditorView.lineWrapping,

    //

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

watch(() => props.darkMode, () => {
    editor.dispatch({
        effects: theme.reconfigure(getTheme(props.darkMode))
    });
});

function getTheme(isDark: boolean)
{
    const extensions = [EditorView.theme({}, { dark: isDark })];
    extensions.push(syntaxHighlighting(defaultHighlightStyle));

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
    <div :class="$style.cm" ref="editorHolder" v-once></div>
</template>

<style module lang="scss">
@use 'bitran-render/scss/def';

@mixin cmRules
{
    .cm-editor
    {
        width: 100%;
        height: 100%;

        &.cm-focused
        {
            outline: none;
            .cm-activeLine::before { opacity: 1; }
        }
    }

    .cm-line
    {
        padding-left: 10px;
        position: relative;
        background: transparent;

        &::before
        {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--editorActiveLine);

            opacity: 0;
            transition: opacity def.$duration;
        }
    }

    .cm-highlightSpace
    {
        opacity: .5;
    }

    .cm-cursor
    {
        border-left-color: var(--editorCursor);
    }

    .cm-selectionBackground,
    ::selection
    {
        background: rgba(#6390c0, .5) !important;
    }
}

.cm
{
    width: 100%;
    height: 100%;
    :global { @include cmRules; }
}
</style>