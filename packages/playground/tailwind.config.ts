import { join } from 'node:path';
import { type Config } from 'tailwindcss';

export default <Config> {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        join(__dirname, './app/**/*.{ts,vue}')
    ],
    theme: {
        screens: {
            mobile: '850px',
        },
        extend: {
            transitionDuration: {
                default: '175ms'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}