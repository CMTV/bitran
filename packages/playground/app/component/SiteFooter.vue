<script setup lang="ts">
import { Pane } from '@app/store/ui';
import FooterButton from './footer/FooterButton.vue';
</script>

<template>
    <footer class="mobile:hidden h-[var(--footerHeight)] flex justify-center bg-neutral-200 dark:bg-neutral-800 border-t border-[var(--stroke)]">
        <div class="flex gap-3">
            <FooterButton icon="menu"       :pane="Pane.Menu" />
            <FooterButton icon="code"       :pane="Pane.Code" />
            <FooterButton icon="monitor"    :pane="Pane.Result" />
        </div>
    </footer>
</template>