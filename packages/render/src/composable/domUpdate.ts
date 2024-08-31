import { watch } from "vue";
import { useDomUpdateSymbol } from "@src/area/domUpdate";

export function useDomUpdate()
{
    const updateSymbol = useDomUpdateSymbol();

    return {
        domUpdate: () => updateSymbol.internalSymbol.value = Symbol(),
        onDomUpdate: (cb: () => void) => {
            watch(updateSymbol.internalSymbol, () => () => typeof cb === 'function' && cb(), { immediate: true });
        },
    }
}