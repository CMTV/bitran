<script setup lang="ts">
defineProps<{ nodeIcon: string }>();
</script>

<template>
    <div :class="$style.blockSkeleton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 140">
            <path :class="$style.pulse" d="M0 45V35c0-3 2-5 5-5h290c3 0 5 2 5 5v10c0 3-2 5-5 5H5c-3 0-5-2-5-5Zm115-25h233c9-9 20-16 33-20H115c-3 0-5 2-5 5v10c0 3 2 5 5 5ZM5 20h90c3 0 5-2 5-5V5c0-3-2-5-5-5H5C2 0 0 2 0 5v10c0 3 2 5 5 5Zm530 10h-75c4 6 8 13 10 20h65c3 0 5-2 5-5V35c0-3-2-5-5-5Zm-83-10h213c3 0 5-2 5-5V5c0-3-2-5-5-5H425l-3 1c12 4 22 10 30 19ZM5 80h240c3 0 5-2 5-5V65c0-3-2-5-5-5H5c-3 0-5 2-5 5v10c0 3 2 5 5 5Zm305-45v10c0 3 2 5 5 5h15c2-7 6-14 10-20h-25c-3 0-5 2-5 5Zm375 45c3 0 5-2 5-5V65c0-3-2-5-5-5H472a73 73 0 0 1 0 20h213ZM130 95v10c0 3 2 5 5 5h205c-4-6-8-13-10-20H135c-3 0-5 2-5 5Zm130-30v10c0 3 2 5 5 5h63a73 73 0 0 1 0-20h-63c-3 0-5 2-5 5Zm-35 55H115c-3 0-5 2-5 5v10c0 3 2 5 5 5h110c3 0 5-2 5-5v-10c0-3-2-5-5-5ZM5 110h110c3 0 5-2 5-5V95c0-3-2-5-5-5H5c-3 0-5 2-5 5v10c0 3 2 5 5 5Zm790-20H505c-3 0-5 2-5 5v10c0 3 2 5 5 5h290c3 0 5-2 5-5V95c0-3-2-5-5-5Zm0 30H505c-3 0-5 2-5 5v10c0 3 2 5 5 5h290c3 0 5-2 5-5v-10c0-3-2-5-5-5Zm0-90H555c-3 0-5 2-5 5v10c0 3 2 5 5 5h240c3 0 5-2 5-5V35c0-3-2-5-5-5Zm0-30H685c-3 0-5 2-5 5v10c0 3 2 5 5 5h110c3 0 5-2 5-5V5c0-3-2-5-5-5Zm0 60h-90c-3 0-5 2-5 5v10c0 3 2 5 5 5h90c3 0 5-2 5-5V65c0-3-2-5-5-5ZM95 120H5c-3 0-5 2-5 5v10c0 3 2 5 5 5h90c3 0 5-2 5-5v-10c0-3-2-5-5-5Zm390-30h-15c-2 7-6 14-10 20h25c3 0 5-2 5-5V95c0-3-2-5-5-5Zm-137 30H245c-3 0-5 2-5 5v10c0 3 2 5 5 5h136c-13-3-24-11-33-20Zm137 0h-33c-9 9-20 17-33 20h66c3 0 5-2 5-5v-10c0-3-2-5-5-5Z"/>
        </svg>
        <div :class="[$style.nodeIcon, $style.pulse]" v-html="nodeIcon"></div>
    </div>
</template>

<style module lang="scss">
.blockSkeleton
{
    position: relative;
    width: 85%;
    margin: auto;
    margin-bottom: 20px;

    & + &
    {
        margin-top: 20px;
    }
}

.nodeIcon
{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8%;
}

.pulse
{
    animation: pulseBg .75s infinite alternate;
}

@keyframes pulseBg
{
    from {
        fill: rgba(128, 128, 128, .2);
    }
    to {
        fill: rgba(128, 128, 128, .1);
    }
}
</style>