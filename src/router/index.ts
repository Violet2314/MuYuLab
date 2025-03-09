import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomePage.vue')
    },
    {
        path: '/production',
        name: 'production',
        component: () => import('../views/ProductionPage.vue')
    },
    {
        path: '/course',
        name: 'course',
        component: () => import('../views/CoursePage.vue')
    },
    {
        path: '/note',
        name: 'note',
        component: () => import('../views/NotePage.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    }
});

export default router; 