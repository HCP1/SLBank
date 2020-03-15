import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'header',
      component: require('@/components/Header').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
