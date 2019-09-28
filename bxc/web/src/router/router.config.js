

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
                path:'/userlogin',
                redirect: '/login',     
            },
            {
                path: '/login',
                name: 'login',
                component: () => import( '@/views/user/Login')
            },
            {
                path: '/reg',
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
            },
            {
                path: '/usercenter/lifephoto',
                name: 'usercenterlifephoto',
                component: () => import( '@/views/usercenter/Lifephoto')
            },
            {
                path: '/grassland/index',
                name: 'grasslandindex',
                component: () => import( '@/views/grassland/Index')
            }
        ]
    },
    {
        path: '/admin',
        component: () => import('@/views/layout/UserLayout'),
        redirect: '/admin/userdetail',   
        children: [
            {
                path: '/admin/userdetail',
                name: 'adminuserdetail',
                component: () => import( '@/views/admin/UserDetail')
            },
            {
                path: '/admin/config',
                name: 'adminconfig',
                component: () => import( '@/views/admin/Config')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/exception/404')
    }
]
