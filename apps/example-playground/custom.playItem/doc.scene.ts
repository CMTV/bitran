import { SceneMeta } from "bitran-playground";

const meta: SceneMeta = {
    title: 'My doc',
    order: 100
}

export default meta;

export const code = `
My conde
`;

import feebee from './feebee.txt?raw';

export const doc = async () => {
    console.log(feebee);
    // Import images
    // Use them in markdown
    // Render markdown

    // Return doc HTML
}