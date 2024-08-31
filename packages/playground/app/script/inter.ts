import { usePageStore } from "@app/store/page";
import { RouteLocationNormalized } from "vue-router";
import { pages } from "./nav";
import { ref } from "vue";

export interface InterState
{
    id: number;
    initial: boolean;
}

let globalInterId = 0;

export const interState = ref<InterState>();

export async function routeChange(to: RouteLocationNormalized, from: RouteLocationNormalized)
{
    const newInterState = incrementInterState();

    const page = usePageStore();
    page.loading = true;

    // INTER ACTIONS BEGIN

    page.error = null;

    const newPath = to.query?.path?.toString() ?? '';
    const newPage = pages[newPath];

    try
    {
        if (!newPage)
            throw new Error(`Unknown path '${newPath}'!`);

        await new Promise(resolve => setTimeout(resolve, 500));
    }
    catch (e)
    {
        page.error = e;
    }

    // INTER ACTIONS END

    if (newInterState.id !== globalInterId)
       return; // Too late, there is a newer route changing request!

    await page.setCurrent(newPage);

    interState.value = newInterState;

    page.loading = false;
    setAppLoaded();
}

//
//
//

/**
 * Hide global app loading indicator (#__loading) and show the app
 */
function setAppLoaded()
{
    document.body.classList.add('__appLoaded');
}

function incrementInterState(): InterState
{
    const interId = ++globalInterId;

    if (!interState.value)
        return {
            initial: true,
            id: interId,
        }

    return {
        initial: false,
        id: interId,
    }
}