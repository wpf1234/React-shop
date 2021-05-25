import Login from "../pages/login"
import Index from '../pages/admin/dashboard'
import List from "../pages/admin/products/list"
import Edit from "../pages/admin/products/edit"
import NotFound from "../pages/notFound"

/**
 * 路由配置
 */
export const mainRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound
    }
]

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: Index,
        isShow: true,
        title: '看板',
        icon: 'icon-barchart'
    },
    {
        path: '/admin/products',
        component: List,
        exact: true,
        isShow: true,
        title: '商品管理',
        icon: 'icon-shop1'
    },
    {
        path: '/admin/products/edit/:id?',
        component: Edit,
        isShow: false
    }
]