export type Typeof<T> = new () => T;
export type Mapped<T> = { [property: string]: T };