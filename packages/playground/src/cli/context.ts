interface Context
{
    mode:           string;
    playgroundRoot: string;
    productsRoot:   string;
}

export let PG_CONTEXT = <Context> {};

export function setupNewContext(newContext: Context)
{
    PG_CONTEXT = newContext;
}