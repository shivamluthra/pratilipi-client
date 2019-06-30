import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import Company from '../components/Company'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: { name: 'NotFound' }
    },
    {
      path: '/',
      component: Login,
      name: 'Login'
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/signup',
      component: Signup,
      name: 'Signup'
    },
    {
      path: '/user/:id',
      component: Profile,
      name: 'Profile'
    },
    {
      path: '/user/:employeeId/company/:companyId',
      component: Company,
      name: 'Company'
    },
    {
      name: 'NotFound',
      path: '/404',
      component: NotFound
    }
  ]
})
