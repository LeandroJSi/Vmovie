<template> 
    <div class="content" >
      <input type="text" v-model="search">
      <button @click="findMovie()">Search</button>
      <Content :datas="movies" route="description"/>
  </div>

</template>

<script>
import axios from 'axios'
import Content from '@/components/Content.vue'
export default {
  components: {
    Content
  },
  data () {
    return {
    search: '',
    movies: [],
    }
  },
  created(){
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&language=pt-BR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-12-30')
    .then(response => (this.movies = response.data.results))
  },
  methods: {
    findMovie(){
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&query=${this.search}`)
    .then(response => (this.movies = response.data.results))
    },
    
  },
  
}
</script>

<style>
  .content{
    background-color: #2e2e36;
    grid-area: content;
    color: #fff;
    padding: 20px;  
  }

</style>