<template>
  <div class="description">

    <ul>
      <li class="desc">
        <div class="imgBox">
          <div v-if="serie.poster_path">
              <img class="cardImg" v-bind:src="imageUrl + serie.poster_path" alt="Card image">
          </div>
          <div v-else>
            <img class="defaultImg" src="@/assets/default.png" alt="Sem poster da Série">
          </div>
        </div>
          <div class="info">
          <h1 class="title">{{serie.name}}</h1>
          <p>Genres: {{ serie.genres | genres}}</p>
          <p>Last released episode: {{ serie.first_air_date}}</p>
          <p>Status: {{ serie.in_production ===true ? 'On launch' : 'Finished'}}</p>
          <p>Seasons: {{ serie.number_of_seasons}}</p>
          <p>Country of origin: {{ serie.origin_country[0]}}</p>
          <p>Language: {{ serie.original_language }}</p>
          <p>Popularity: {{ serie.popularity }}</p>
          <button class="favorite" @click="saveFavorite(serie.id)">Favorite</button>
        </div>
      </li>
      <div class="textBox">
        <h3>Synopsis</h3>
        <p class="overview">{{ serie.overview }}</p>
      </div>
      
      <div class="video" v-if="serie.videos.results[0] !== undefined">
        <iframe :src="'https://www.youtube.com/embed/' +  this.serie.videos.results[0].key" width="600" height="320"
          frameborder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>  
      <p v-else><img class="defaultVideo" src="@/assets/defaultVideo.png" alt="No trailer"></p>
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
      serie:{ 
        name: '',
        first_air_date: '00-00-00',
        number_of_seasons: '0',
        in_production: false,
        origin_country:[''],
        original_language:'',
        popularity: '0',
        videos:{
            results:[]
        },
        genres: [],
        backdrop_path: null,
        poster_path: null,
      },
      page: 1
    }
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/tv/${this.id}?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&append_to_response=videos`)
    .then(response => (this.serie = response.data))
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
      if(localStorage.getItem('serieFavorite') === ''){
        localStorage.setItem ('serieFavorite', id)
      }else{
        Favorites = localStorage.getItem('serieFavorite').split(',')
        Favorites.push(id)
        localStorage.setItem ('serieFavorite', Favorites)
      }
    },
    /* paginate(index){
      indexPage = 
    } */
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
.video, .defaultTrailer{
  width: 600px;
  margin:10px;
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