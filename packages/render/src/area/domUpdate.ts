import { inject, InjectionKey, Ref } from "vue";

export interface DomUpdateData
{
    internalSymbol: Ref<symbol>;
}

export const domUpdateKey = Symbol() as InjectionKey<DomUpdateData>;

export function useDomUpdateSymbol()
{
    return inject(domUpdateKey);
}