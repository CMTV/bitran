<script setup lang="ts">
import { ref } from 'vue';
import FooterButton from './FooterButton.vue';
import { useUiStore, Pane } from '@app/store/ui';

const ui = useUiStore();
</script>

<template>
    <footer class="h-[var(--footerHeight)] border-t border-[var(--stroke)] bg-gradient-to-t from-neutral-50 to-neutral-200 flex items-center justify-center mobile:hidden">
        <div class="flex gap-3">
            <FooterButton :pane="Pane.Config" icon="cogs" />
            <FooterButton :pane="Pane.Content" icon="article" />
            <FooterButton :pane="Pane.Result" icon="json-obj" />
        </div>
    </footer>
</template>