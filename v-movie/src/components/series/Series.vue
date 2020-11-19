<template>
    <div class="series">
      <input type="text" v-model="search">
      <button class="btnSearch" @click="findSerie()">Search</button>
      <Content :datas="series" route="description-serie"/>
    </div>
</template>

<script>

import axios from 'axios'
import Content from '@/components/Content.vue'

export default {
  components:{ Content},
  data () {
    return {
    search: '',
    series: [],
    }
  },
  created(){
  axios.get('https://api.themoviedb.org/3/discover/tv?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false')
    .then(response => (this.series = response.data.results))
  },
  methods: {
    findSerie(){
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&query=${this.search}`)
    .then(response => (this.series = response.data.results))
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
  }
  .btnSearch{
    background-color: #ffca3d;
  }
</style>