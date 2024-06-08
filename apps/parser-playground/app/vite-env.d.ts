/// <reference types="vite/client" />

declare module 'virtual:examples'
{
    const Examples: import('../plugin/examples').ExampleData[];
    export default Examples;
}