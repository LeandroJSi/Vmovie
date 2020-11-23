import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Movie from '@/components/movies/Movie.vue'
import Series from '@/components/series/Series.vue'
import Favorite from '@/components/Favorite.vue'
import Description from '@/components/movies/Description.vue'
import DescriptionSerie from '@/components/series/Description'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [{
    path: '/',
    component: Home
  },
  {
    path: '/filmes',
    component: Movie
  },
  {
    path:'/series',
    component: Series
  },
  {
    path:'/favorite',
    component: Favorite
  },
  {
    path:'/description/:id',
    component: Description
  },{
    path:'/description-serie/:id',
    component: DescriptionSerie
  }]
})