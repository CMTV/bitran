export const prefix = 'bitran';

export const cls = new class {
    constructor() { return new Proxy(this, this); }

    get (target, prop)
    {
        return prop ? prefix + '-' + prop : '';
    }
} as any as Record<string, string>;