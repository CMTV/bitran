<script setup lang="ts">
import { Compartment, EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { EditorView, basicSetup } from 'codemirror';
import { onMounted, ref, watch } from 'vue';
import { indentWithTab } from '@codemirror/commands';
import { LanguageSupport, indentUnit } from '@codemirror/language';

const emit = defineEmits<{
    (e: 'userInput', newDoc: string): void
}>();

const parentDoc = defineModel<string>('doc');
const innerDoc = ref<string>(parentDoc.value);

const props = defineProps<{
    readonly?: boolean,
    lang?: LanguageSupport
}>();

const editorHolder = ref<HTMLDivElement>();

onMounted(() =>
{
    const readonly =    new Compartment;
    const lang =        new Compartment;

    const extensions = [
        basicSetup,
        indentUnit.of('    '),
        keymap.of([indentWithTab]),
        readonly.of(EditorState.readOnly.of(props.readonly)),
        lang.of(props.lang ?? []),
        EditorView.updateListener.of(e => {
            if (!e.docChanged) return;
            innerDoc.value = editor.state.doc.toString();
        })
    ];

    const editor = new EditorView({
        doc: innerDoc.value,
        extensions,
        parent: editorHolder.value
    });

    watch(() => props.readonly, () => {
        editor.dispatch({ effects: readonly.reconfigure(EditorState.readOnly.of(props.readonly)) });
    });

    watch(() => props.lang, newLang => {
        editor.dispatch({ effects: lang.reconfigure(newLang ?? []) });
    });

    watch(
        [parentDoc, innerDoc],
        ([newParent, newInner], [oldParent, oldInner]) => {
            const parentChanged = newParent !== oldParent;
            const innerChanged = newInner !== oldInner;

            const outsideChange = parentChanged && newParent !== newInner;
            if (outsideChange)
            {
                editor.dispatch({
                    changes: {
                        from: 0,
                        to: editor.state.doc.length,
                        insert: newParent,
                    }
                });
            }

            const insideChange = innerChanged && newInner !== newParent
            if (insideChange)
            {
                parentDoc.value = newInner;
                emit('userInput', newInner);
            }
    });
});
</script>

<template>
    <div ref="editorHolder" :class="$style.cm"></div>
</template>

<style module lang="scss">
@mixin cmRules
{
    .cm-editor
    {
        @apply h-full;

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

        &::-webkit-scrollbar
        {
            width: 7px;
            height: 7px;
        }

        &::-webkit-scrollbar-thumb,
        &::-webkit-scrollbar-corner
        {
            @apply bg-neutral-300;
        }
    }

    .cm-gutters
    {
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
    @apply h-full bg-[var(--bgDarker)];
    :global { @include cmRules; }
}
</style>