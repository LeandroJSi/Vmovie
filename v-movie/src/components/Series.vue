<template>
    <div class="series">
      <ul class="lista" >
        <li v-for="(serie,serie_id) in series" :key="serie_id" class="showImg">
          <div class="imgY">
            <div class="year">{{serie.first_air_date.split('-')[0]}}</div>
            <router-link :to="'/descricao/' + `${serie.id}`">
              <div v-if="serie.poster_path">
                <img class="card-img" v-bind:src="imageUrl + serie.poster_path" alt="Card image">
              </div>
              <div v-else>
                <img class="card-img" src="@/assets/default.jpg" alt="Sem poster da série">
              </div>
            </router-link>
          </div>
          <div class="card-img-overlay">
            <h5 class="card-title">{{serie.name}}</h5>
            <p>{{ genero(serie.genre_ids) }}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
    imageUrl: 'http://image.tmdb.org/t/p/w185',
    series: [],
    nomegenr:[],
    }
  },
  created(){
  axios.get('https://api.themoviedb.org/3/discover/tv?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&sort_by=first_air_date.asc&language=en-US&timezone=America%2FNew_York')
    .then(response => (this.series = response.data.results))
  },
  methods: {
    
    genero(ids){
      if(ids.length === 0){
        return 'Uncategorized'
      }else{
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

      /*  */
    }
  }

}
</script>

<style>
 .series{
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
  .card-img-overlay h5{
    margin: 0;
  }
</style>