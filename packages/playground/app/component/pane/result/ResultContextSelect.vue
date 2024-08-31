<script setup lang="ts">
import { ContextItem, ContextItems } from '@app/script/context';
import Icon from '@app/component/icon/Icon.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    contextItems: ContextItems;
}>();

const currentContext = defineModel<ContextItem>();
const select = ref<string>();

const title = computed(() => {
    let title = Object.keys(props.contextItems).shift();

    if (select.value in props.contextItems)
        title = select.value;

    return capitalizeFirstLetter(title);
});

watch([select, props], () => {
    currentContext.value = props.contextItems[select.value] ?? Object.values(props.contextItems)[0];
}, { immediate: true });

function capitalizeFirstLetter(str: string)
{
    return str.at(0).toUpperCase() + str.substring(1);
}
</script>

<template>
    <div
        class="relative p-2 flex items-center min-w-0 gap-2 text-sm text-[var(--textShade2)]"
        :class="{ 'hidden': Object.keys(contextItems).length < 2 }">

        <select class="absolute left-0 right-0 h-full opacity-0" v-model="select">
            <option :value="id" v-for="{ id } of contextItems">{{ capitalizeFirstLetter(id) }}</option>
        </select>
        <span class="overflow-hidden text-ellipsis pointer-events-none whitespace-nowrap">{{ title }}</span>
        <Icon name="down" class="size-[18px] pointer-events-none shrink-0 relative top-[2px]" />
    </div>
</template>