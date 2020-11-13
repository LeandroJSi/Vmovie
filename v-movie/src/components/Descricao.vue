<template>
  <div class="descricao">
    <ul class="movie" >
      <li class="desc">
        <div class="imgBox">
          <div class="year">{{movie.release_date.split('-')[0]}}</div>
          <div v-if="movie.poster_path">
              <img class="cardImg" v-bind:src="imageUrl + movie.poster_path" alt="Card image">
          </div>
          <div v-else>
            <img class="cardImg" src="@/assets/default.jpg" alt="Sem poster do filme">
          </div>
        </div>
        <h1 class="title">{{movie.title}}</h1>
        <p> {{ movie.genres.name }}</p>
      </li>
      <hr>
      <div class="textBox"><p>{{ movie.overview }}</p></div>
      <div class="video">
        <iframe src="https://www.homehost.com.br">
          Seu navegador não possui Suporte para este recurso...
        </iframe>
      </div>
    </ul>  
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      id: this.$route.params.id,
      imageUrl: 'http://image.tmdb.org/t/p/w185',
      movie:[],
      series:[],
    }
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4`)
    .then(response => {this.movie = response.data})

    axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4`)
    .then(response => (this.series = response.data.results))
  }  
}
</script>

<style>
.cardImg{
  height: 340px;
  width: 250px;

}
.imgBox{
  height: 340px;
  width: 250px;
  margin: 0;
  position: relative;
}
.title{
  float:left;
  padding-left: 20px;
  padding-top: 285px;
  color: #fff;
}
.desc{
  display: flex;

}
.textBox{
  width: 400px;
  color: #fff;
}
</style>