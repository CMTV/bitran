import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { routeChange } from './script/inter';
import { usePageStore } from './store/page';

// Global styles
import './style/index.scss';

// Bitran Renderer styles
import 'bitran-render/style.css';

import App from './App.vue';

//
//
//

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: import.meta.env.BASE_URL, component: App }
    ],
});

router.beforeEach((to, from) => {
    routeChange(to, from);
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#__app');

const page = usePageStore();

watch(() => page.documentTitle, () => {
    document.title = page.documentTitle;
}, { immediate: true });