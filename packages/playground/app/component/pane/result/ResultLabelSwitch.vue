<script setup lang="ts">
import Icon from '@app/component/icon/Icon.vue';

defineProps<{
    icon:   string;
    label:  string;
    active?: boolean;
}>();
</script>

<template>
    <button class="flex items-center gap-2 px-3 border-b-[3px] transition duration-default"
            :class="active ? 'border-[var(--strokeStronger)] text-[var(--textColor)]' : 'border-transparent text-[var(--textShade1)]'">
        <Icon :name="icon" class="size-[20px]" />
        <div class="font-semibold">{{ label }}</div>
    </button>
</template>