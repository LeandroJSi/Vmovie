<template> 
    <div class="content" >
      <img class="btnSearch" src="@/assets/search.png" alt="Search icon" @click="findMovie()">
      <input type="text" v-model="search" placeholder="Search">
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
    pages:''
    }
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.$store.state.apiKey}&language=pt-BR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-12-30`)
      .then(response => this.movies=response.data.results)
  },
  methods: {
    findMovie(){
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.$store.state.apiKey}&query=${this.search}`)
    .then(response => (this.movies = response.data.results))
    }    
  },
}
</script>

<style>
  .content{
    background-color: #2e2e36;
    grid-area: content;
    color: #fff;
    padding: 20px; 
    position: relative;  
  }
  .content img, .content input{
    float: right;
  }
  .btnSearch{
    border: none;
    margin:32px 175px 30px 8px;
    outline: 0;
    width: 20px;
  }
  .content input[type=text]{
    border: none;
    border-bottom: 1px solid#918b7e;
    background-color: #2e2e36;
    color:#fff;
    margin: 30px 0;
    font-size: 20px;
    outline: 0;
    padding-left: 10px;
    padding-bottom: 5px;
  }
</style>