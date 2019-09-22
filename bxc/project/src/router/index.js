

import UserLogin from '@/views/user/Login'
import UserReg from '@/views/user/Reg'
import UserDetail from '@/views/user/UserDetail'

export default {
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:'/userlogin',
      // component: HelloWorld
    },
    {
      path: '/userlogin',
      name: 'userLogin',
      component: UserLogin
    },
    {
      path: '/userreg',
      name: 'userReg',
      component: UserReg
    },
    {
      path: '/userdetail',
      name: 'userDetail',
      component: UserDetail
    }
  ]
}
