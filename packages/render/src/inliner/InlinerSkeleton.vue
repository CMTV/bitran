<script setup lang="ts">
defineProps<{ nodeIcon: string }>();
</script>

<template>
    <span :class="$style.inlinerSkeleton">
        <span :class="$style.icon" v-html="nodeIcon"></span>
    </span>
</template>

<style module lang="scss">
.inlinerSkeleton
{
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 16px;
    margin: 0 10px;
    border-radius: 5px;

    animation: pulseBg .75s infinite alternate;

    & + &
    {
        margin-left: 0;
    }

    > .icon
    {
        width: 14px;
        height: 14px;
        fill: rgba(128, 128, 128, .6);
    }
}

@keyframes pulseBg
{
    from {
        background: rgba(128, 128, 128, .2);
    }
    to {
        background: rgba(128, 128, 128, .1);
    }
}
</style>