<template>
    <div class="series">
      <img class="btnSearch" src="@/assets/search.png" alt="Search icon" @click="findSerie()">
      <input type="text" v-model="search" placeholder="Search">
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
  axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.$store.state.apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)
    .then(response => (this.series = response.data.results))
  },
  methods: {
    findSerie(){
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.$store.state.apiKey}&query=${this.search}`)
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
    position: relative;
  }
  .series input, .series img{
    float: right;
  }
  .btnSearch{
    border: none;
    margin:32px 175px 30px 8px;
    outline: 0;
    width: 20px;
  }
  .series input[type=text]{
    border: none;
    border-bottom: 1px solid#918b7e;
    background-color: #2e2e36;
    color:#fff;
    margin: 30px 0;
    font-size: 20px;
    outline: 0;
    padding-left: 10px;
    padding-bottom: 5px;
  }

</style>