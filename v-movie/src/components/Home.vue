<template>
  <div class="Home">
    <Content :datas="movies" route="description" />
    
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Content from '@/components/Content.vue'
Vue.use(axios);

export default {
  components:{ Content},
  data () {
    return {
    movies: [],
    }
  },
  created(){
  axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b835ed932f4f0a4532e2512ff3cce439&page=1')
    .then(response => (this.movies = response.data.results))
  },
  
}
</script>

<style>
  .Home{
    background-color: #2e2e36;
    grid-area: content;
    color: #fff;
    padding: 20px;
  }
</style>