import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/index'
import AddStuPage from '@/views/AddStuPage'
import Dormitory from '@/views/Dormitory'
import ExChange from '@/views/ExChange'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/AddStuPage',
      name: 'AddStuPage',
      component: AddStuPage
    },
    {
      path: '/Dormitory',
      name: 'Dormitory',
      component: Dormitory
    },
    {
      path: '/ExChange',
      name: 'ExChange',
      component: ExChange
    }
  ]
})
