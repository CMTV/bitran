import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { usePageStore } from './store/page';

import App from './App.vue';

// Global styles
import './style/index.scss';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App }
    ]
});

router.beforeEach(async (to, from, next) => {
    const pageStore = usePageStore();
    const reroute = await pageStore.setupPageStore(to);

    if (reroute)
    {
        router.push({
            path: import.meta.env.BASE_URL,
            query: (<any>reroute)?.query ?? null
        });
    }

    next();
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#__app');