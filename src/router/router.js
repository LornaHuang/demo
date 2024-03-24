// 1 从vue-router按需导入两个方法
// createRouter方法用于创建路由实例对象
// createWebHashHistory方法用于指定路由的工作模式（hash模式）
import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '@/views/homePage.vue'
const routes = [
    {
        path: '/',
        name: 'loginIndex',
        component: () => import('@/views/login')
    },
    {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage')
    },
    {
        path: '/homeIndex',
        name: 'homeIndex',
        component: homePage,
        children: [
            {
                path: '/homeIndex',
                name: 'homeIndex',
                component: () =>
                    import('@/views/homeIndex')
            },
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router