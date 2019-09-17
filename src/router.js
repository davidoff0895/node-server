import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./components/home') },
      { path: '/mail', component: () => import('./components/mail') },
      { path: '/pdf', component: () => import('./components/pdf') }
    ]
  })
}
