import { createRouter, createWebHistory } from 'vue-router'

/**
 * @desc 命名规范
 * path: '/personal-center',
 * name: PersonalCenter,
 * component: PersonalCenter
 */
const routes = [
    {
        path: '/',
        redirect: '/screen',
    },
    {
        path: '/screen',
        name: 'Screen',
        component: () => import('@/views/CalcAndNote.vue'),
    },
    {
        path: '/algorithm',
        name: 'Algorithm',
        component: () => import('@/views/Algorithm.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
