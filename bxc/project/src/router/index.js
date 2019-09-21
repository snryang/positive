
import HelloWorld from '@/components/HelloWorld'
import HelloVux from '@/components/HelloFromVux'
import UserLogin from '@/views/user/Login'
import UserReg from '@/views/user/Reg'
import UserDetail from '@/views/user/UserDetail'

export default {
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/1',
      name: 'HelloVux',
      component: HelloVux
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
