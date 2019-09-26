

console.log('router.config.js test ywb')
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/layout/BlankLayout'),
        redirect: '/login',        
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import( '@/views/user/Login')
            },
            {
                path: 'reg',
                name: 'reg',
                component: () => import( '@/views/user/Reg')
            }
        ]
    },
    {
        path: '/usercenter',
        component: () => import('@/views/layout/UserLayout'),
        redirect: '/usercenter/index',        
        children: [
            {
                path: '/usercenter/index',
                name: 'usercenterindex',
                component: () => import( '@/views/usercenter/Index')
            },
            {
                path: '/usercenter/detail',
                name: 'usercenterdetail',
                component: () => import( '@/views/usercenter/Detail')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/exception/404')
    }
]
