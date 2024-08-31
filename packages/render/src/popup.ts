import { onMounted, ref, Ref, watch } from "vue";
import { useFloating, shift, offset, autoUpdate, limitShift } from '@floating-ui/vue';

export function usePopup(caller: Ref<HTMLElement>, popup: Ref<HTMLElement>)
{
    const canShow = ref<boolean>(true);
    const popupActive = ref<boolean>();

    const { floatingStyles } = useFloating(caller, popup, {
        placement: 'right-start',
        whileElementsMounted: autoUpdate,
        middleware: [
            offset({ mainAxis: 3 }),
            shift({ limiter: limitShift() }),
        ]
    });

    let skipClick = false;

    function handleCloseClick(e: MouseEvent)
    {
        const target = e.target as HTMLElement;

        if (skipClick)
        {
            skipClick = false;
            return;
        }

        if (!popup.value?.contains(target))
            popupActive.value = false;
    }

    onMounted(() => {
        caller.value.addEventListener('click', e => {
            if (!canShow.value)
                return;

            popupActive.value = !popupActive.value;
            skipClick = true;
        });
    })

    watch(popupActive, () => {
        if (popupActive.value) window.addEventListener('click', handleCloseClick);
        else window.removeEventListener('click', handleCloseClick);
    });

    return {
        canShow,
        popupActive,
        floatingStyles,
    }
}