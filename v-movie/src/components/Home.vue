<template>
  <div class="Home">
    <Content :datas="movies" route="description" />
    <ul class="paginate" v-if="movies != ''">
      <li><input type="button" class="btnPaginate" @click="lessPages()" value="<"></li>
      <li  v-for="(page,i) in listPages" :key="i"><input type="button" class="btnPaginate" @click="getResults(i+1+valuePage)" :value="i+1+valuePage"></li>
      <li><input type="button" class="btnPaginate" @click="morePages()" value=">"></li>
    </ul>
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
    totalpages:'',
    listPages:10,
    valuePage: 0
    }
  },
  created(){
    this.getResults(1)
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=1`)
      .then(response => this.totalPages=(response.data.total_results)/50)
  },
  methods:{
    getResults(page){
      this.movies = []
      let index
      let apiPage
      if(page%2 == 0){
        index =  parseInt((page + 1)/2) 
        apiPage = 3 + (index - 1)* 5
        for(let i=0; i<10; i++){
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=${apiPage}`)
          .then(response => this.movies.push(response.data.results[i+10]))
        }
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=${apiPage+1}`)
          .then(response => this.movies.push(...response.data.results))
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=${apiPage+2}`)
          .then(response => this.movies.push(...response.data.results))
      }else{
        index =  parseInt((page + 1)/2) 
        apiPage = 1 + (index - 1)* 5
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=${apiPage}`)
          .then(response => this.movies.push(...response.data.results))
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=${apiPage+1}`)
          .then(response => this.movies.push(...response.data.results))
         for(let i=0; i<10; i++){
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.$store.state.apiKey}&page=${apiPage+2}`)
          .then(response => this.movies.push(response.data.results[i]))
        }
      }
    }, 

    morePages(){
      if(this.valuePage <=180){
        this.valuePage+=10
      }
    },
    lessPages(){
      console.log(this.valuePage)
      if(this.valuePage > 0){
        this.valuePage-=10
      }
    }
  }
}
</script>
<style>
  .Home{
    background-color: #2e2e36;
    grid-area: content;
    color: #fff;
    padding: 20px;
    position: relative;
  }
  .paginate{
    display: inline;
    align-content: center;
    padding: 0;
    margin: 30px 700px;
  }

  .paginate li{
    display: inline;
    list-style-type: none;
    margin: 2px;
    padding: 0;
  }
  .btnPaginate{
    font-size: 12px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    color: #000;
    background-color:#dbae53;
    cursor:pointer;
    border: none;
    outline:0;
  }
</style>