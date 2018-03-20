import Vue from 'vue'
import Router from 'vue-router'
import Query from '@/components/Query'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Query',
      component: Query
    }
  ]
})
