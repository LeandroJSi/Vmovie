<template>
  <div class="descricao">
    <ul>
      <li class="desc">
        <div class="imgBox">
          <div v-if="movie.poster_path"><img class="cardImg" v-bind:src="imageUrl + movie.poster_path" alt="Card image"></div>
          <div v-else><img class="defaultImg" src="@/assets/default.png" alt="Sem poster do filme"></div>
        </div>
        <div class="info">
          <h2>Title: {{movie.title}}</h2>
          <p>Genres: {{ movie.genres | genres}}</p>
          <p>Release date: {{ movie.release_date}}</p>
          <p>Language: {{ movie.original_language }}</p>
          <p>Popularity: {{ movie.popularity }}</p>
          <button class="favorite" @click="saveFavorite(movie.id)">Favorite</button>
        </div>
      </li>
      <div>
        <div class="textBox">
          <h3>Synopsis</h3>
          <p class="overview">{{ movie.overview }}</p>
        </div>
        <div class="video" v-if="movie.videos.results[0] !== undefined">
          <iframe :src="'https://www.youtube.com/embed/' +  movie.videos.results[0].key" width="600" height="320"
            frameborder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
        <p v-else><img class="defaultVideo" src="@/assets/defaultVideo.png" alt="No trailer"></p> 
        
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
      movie: { 
        title: '',
        videos:{
            results:[]
        },
        original_language:'',
        release_date:'00-00-00',
        popularity:'0',
        genres: [],
        backdrop_path: null,
        poster_path: null,
      }
  
    }
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&append_to_response=videos`)
    .then(response => {this.movie = response.data})
  },
  filters:{
    genres(value){
            
      if(value != undefined && value.length > 1 ){
        return value.map(value => value.name ).reduce((accumulator, currentValue)=> accumulator + ', ' + currentValue)
      }else if(value!=''){          
        return value[0].name;
      }      
        return 'Uncategorized'      
        }
  }, 
  methods:{
    saveFavorite(id){
      let Favorites = []
      if(localStorage.getItem('movieFavorite') === ''){
        localStorage.setItem ('movieFavorite', id)
      }else{
        Favorites = localStorage.getItem('movieFavorite').split(',')
        Favorites.push(id)
        localStorage.setItem ('movieFavorite', Favorites)
      }
      
    }
  } 
}
</script>

<style>
.descricao{
  grid-area: content;
  display: flex;

}
.cardImg, .defaultImg{
  height: 340px;
  width: 250px;

}
.backdrop{
  margin-top: 20px;
  height: 400px;
  overflow:hidden;
}
.imgBox{
  height: 340px;
  width: 250px;
  margin: 0;
  position: relative;
}
.desc{
  display: flex;
}
.info{
  color: #fff;
  padding-left: 15px;
}

.textBox{
  width: 400px;
  color: #fff;
  margin: 0;
}
.video{
  width: 600px;
  margin:10px;
}
.defaultVideo{
  width: 600px;
  height: 320px;
}

p.overview{
  line-height: 28px;
  text-indent: 20px;
  text-align: justify;
}
.favorite{
  border-radius: 4px;
  font-size: 16px;
  font-family:'Robotto', sans-serif ;
  background-color:#9e515b;
  color: #fff;
  height: 25px;
}
.favorite:hover{
  background-color: #b81228;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
</style>