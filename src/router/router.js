// 1 从vue-router按需导入两个方法
// createRouter方法用于创建路由实例对象
// createWebHashHistory方法用于指定路由的工作模式（hash模式）
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/homeIndex')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router