/// <reference types="vite/client" />

declare module 'virtual:content'
{
    const PreContent: import('../src/cli/plugin/content').Content;
    export default PreContent;
}

declare module '*.md' {}