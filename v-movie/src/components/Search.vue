<template>
  <div class="search">
    <div class="txtBtn">
      <input type="text" v-model="search">
      <button @click="find()">Search</button>

      <ul class="lista" >
      <li v-for="(movie,id) in movies" :key="id" class="showImg">
        <div class="imgY">
          <div class="year">{{ movie.release_date ? movie.release_date.split('-')[0] : first_air_date.split('-')[0]}}</div>
          <router-link :to="'/descricao/' + `${movie.id}`">
            <div v-if="movie.poster_path">
                <img class="card-img" v-bind:src="'http://image.tmdb.org/t/p/w185' + movie.poster_path" alt="Card image">
            </div>
            <div v-else>
              <img class="card-img" src="@/assets/default.png" alt="Sem poster do filme">
            </div></router-link></div>
        <div class="card-img-overlay">
          <h5 class="card-title">{{movie.title}}</h5> 
        </div>
      </li>
    </ul>
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
     
      search:'',
      movies:[],
      nomegenr:[],
    }
  },
  methods: {
    find(){
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.$store.state.apiKey}&query=${this.search}`)
    .then(response => (this.movies = response.data.results))
    },
    genero(ids = [''] ){
      let genr = this.$store.state.genr
      for(let i=0; i<ids.length;i++){
        for( let j=0; j<genr.length;j++){
          if(ids[i] === genr[j].id){
            this.nomegenr[i] = genr[j].name
          }
        }
      }
      return this.nomegenr.reduce((acumulator,createValue) => acumulator + ', ' + createValue)
    }
  }
}
</script>
<style>

</style>