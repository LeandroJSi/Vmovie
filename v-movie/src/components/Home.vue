<template>
  <div class="Home">
    <form action="" class="search">
    </form>
    <ul class="lista" >
      <li v-for="(movie,id) in movies" :key="id" class="showImg">
        <div class="imgY">
          <div class="year">{{movie.release_date !== undefined ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0]}}</div>
          <router-link :to="'/descricao/' + `${movie.id}`">
            <div v-if="movie.poster_path">
                <img class="card-img" v-bind:src="imageUrl + movie.poster_path" alt="Card image">
            </div>
            <div v-else>
              <img class="card-img" src="@/assets/default.jpg" alt="Sem poster do filme/série">
            </div>
          </router-link>
        </div>
        <div class="card-img-overlay">
          <h4 class="card-title">{{movie.title !== undefined ? movie.title : movie.name }}</h4>
          <p>{{ genero(movie.genre_ids) }}</p>
        </div>
      </li>
      
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.use(axios);

export default {
  data () {
    return {
    imageUrl: 'http://image.tmdb.org/t/p/w185',
    movies: [],
    nomegenr:[],
    }
  },
  created(){
  axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b835ed932f4f0a4532e2512ff3cce439&page=1')
    .then(response => (this.movies = response.data.results))
  },
  methods: {
    genero(ids){
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
  .Home{
    background-color: #2e2e36;
    
    grid-area: content;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: center;
    
  }

  .lista{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
    grid-template-rows: repeat(2, 350px);
    grid-gap: 10px;
    width: 90%;

  }

  li {
    list-style-type: none;
  }
  .showImg:hover{
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
}
  .imgY{
    width: 200px;
    height: 290px;
    margin: 0;
    position: relative;
  }
  .year{
    font-size: 12px;
    position: absolute;
    background: rgba(13, 219, 54, 0.7);
    border-bottom-left-radius: 4px;
    top:0;
    right: 0;
    width: 35px;
    display: flex;
    justify-content: center;

  }
  .card-img{
    width: 200px;
    height: 290px;
    margin: 0;
  }

  .card-img-overlay p{
    margin: 0;
    font-size: 0.8rem;
  }
  .card-img-overlay h4{
    margin: 0;
  }
</style>