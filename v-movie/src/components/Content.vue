<template>
  <ul class="lista" >
      <li v-for="(data,id) in datas" :key="id" class="showImg">
        <div class="imgY">
          <div class="year">{{data.release_date !== undefined ? data.release_date.split('-')[0] : data.first_air_date.split('-')[0]}}</div>
          <router-link :to="`/${route}/` + `${data.id}`">
            <div v-if="data.poster_path">
                <img class="card-img" v-bind:src="imageUrl + data.poster_path" alt="Card image">
            </div>
            <div v-else>
              <img class="card-img" src="@/assets/default.png" alt="Sem poster do filme/série">
            </div>
          </router-link>
        </div>
        <div class="card-img-overlay">
          <h4 class="card-title">{{data.title !== undefined ? data.title : data.name }}</h4>
          <p>{{ genero(data.genre_ids) }}</p>
        </div>
      </li>
    </ul>

</template>

<script>
export default {
  data () {
    return {
    imageUrl: 'http://image.tmdb.org/t/p/w185',
    nomegenr:[],
    }
  },
  props:['datas','route'],
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
      return this.nomegenr.reduce((acumulator,createValue) => acumulator + ',' + createValue)
    }
  }
}

</script>

<style>
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
    background: rgb(13, 219, 54, 0.7);
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