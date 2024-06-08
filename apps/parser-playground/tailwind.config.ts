import { Config } from 'tailwindcss';

export default <Config> {
    content: [
        "./app/**/*.{html,ts,vue}"
    ],
    theme: {
        screens: {
            mobile: '800px'
        },
        extend: {
            transitionDuration: {
                default: '175ms'
            }
        }
    }
}