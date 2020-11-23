<template>
  <div class="favoritos">
    <h2>List of favorite movies</h2>
    <div class="listMovies">
      <div class="" v-if="movies.length > 0">
        <ul class="listFavorite">
          <li v-for="(movie,id) in movies" :key="id">
            <div class="imgY">
              <button class="removeBtn" @click="remove(movie.id,'movie')">X</button>
              <router-link :to="'/description/' + `${movie.id}`">
                <div v-if="movie.poster_path">
                    <img class="card-img" v-bind:src="imageUrl + movie.poster_path" alt="Card image">
                </div>
                <div v-else>
                  <img class="card-img" src="@/assets/default.png" alt="Sem poster do filme">
                </div></router-link>
            </div>
            <div class="card-img-overlay">
              <h5 class="card-title">{{movie.title}}</h5>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>No favorite movies added</p>
    </div>
    <br>

  <h2 class="textMovie">List of favorite series</h2>
  <div class="listSeries">
    <div class="" v-if="series.length > 0 ">
      <ul class="listFavorite" >
        <li v-for="(serie,serie_id) in series" :key="serie_id">
          <div class="imgY">
            <button class="removeBtn" @click="remove(serie.id,'serie')">X</button>
            <router-link :to="'/description-serie/' + `${serie.id}`">
              <div v-if="serie.poster_path">
                <img class="card-img" v-bind:src="imageUrl + serie.poster_path" alt="Card image">
              </div>
              <div v-else>
                <img class="card-img" src="@/assets/default.png" alt="Sem poster da série">
              </div>
            </router-link>
          </div>
          <div class="card-img-overlay">
            <h5 class="card-title">{{serie.name}}</h5>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>No favorite series added</p>
    </div>
  </div>
</template>

<script>
 import axios from 'axios' 
export default {
  data(){
    return{
      imageUrl: 'http://image.tmdb.org/t/p/w185',
      series:[],
      movies:[],
        
  
    }
  },
   created(){
     let id = localStorage.getItem('serieFavorite').split(',')
     let idMovie = localStorage.getItem('movieFavorite').split(',')
      if(id != ''){
        for(let i=0; i < id.length; i++){
          axios.get(`https://api.themoviedb.org/3/tv/${id[i]}?api_key=${this.$store.state.apiKey}&append_to_response=videos`)
            .then(response => (this.series.push(response.data)))
        }
      }
      if(idMovie != ''){
        for(let j=0; j < idMovie.length; j++){
          axios.get(`https://api.themoviedb.org/3/movie/${idMovie[j]}?api_key=${this.$store.state.apiKey}&append_to_response=videos`)
            .then(response => (this.movies.push(response.data)))
        }
      }    
  },
  methods: {
    remove(id,type){
      if(type === 'serie'){
        this.series = this.series.filter((value) => value.id !== id)
        let store = localStorage.getItem('serieFavorite').split(',').filter(value => value != id)
        localStorage.setItem('serieFavorite',store)
      }else{
        this.movies = this.movies.filter((value) => value.id !== id)
        let store = localStorage.getItem('movieFavorite').split(',').filter(value => value != id)
        console.log(store)
        localStorage.setItem('movieFavorite',store)
      }
    }
  }

}
</script>

<style>
.favoritos{
  color: #fff;
}
.listFavorite{
  display: flex;
  flex-wrap: wrap;
}
.listFavorite li{
  margin: 0 10px;
  width: 200px;
  list-style-type: none;
}
.textMovie{
  margin-top: 50px;
}
.listMovies{
  width: 100%;
}
.listSeries{
  width: 100%;
}
.removeBtn{
  font-size: 12px;
  position: absolute;
  background:#a6241b;
  border-radius: 100%;
  border: 1px solid rgba(0,0,0,0.3);
  top:-10px;
  right: -10px;
  width: 20px;
  height: 20px;
  margin: 0;
  color:#fff;
  cursor: pointer;
  padding: 0;
  outline: 0;
}
</style>