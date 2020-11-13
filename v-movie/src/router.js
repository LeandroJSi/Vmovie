import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Search from '@/components/Search.vue'
import Series from '@/components/Series.vue'
import Favoritos from '@/components/Favoritos.vue'
import Descricao from '@/components/Descricao.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [{
    path: '/',
    component: Home
  },
  {
    path: '/filmes',
    component: Search
  },
  {
    path:'/series',
    component: Series
  },
  {
    path:'/favoritos',
    component: Favoritos
  },
  {
    path:'/descricao/:id',
    component: Descricao
  }]
})