<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  created(){
    localStorage.setItem ('movieFavorite','')
    localStorage.setItem ('serieFavorite','')
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.$store.state.apiKey}&language=en-US`)
      .then(response => {this.$store.state.genr = response.data.genres})
  }
}
</script>

<style>
  * {
    font-family:'Robotto', sans-serif ;
  }
  body{
    background-color: #23252e;
    margin: 0;
  }
  #app{
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
      "header header"
      "content content"
      "footer footer"
  }
  input{
    background-color: #4f4f59;
    color: #fff;
    width: 300px;
  }
  button{
    background-color: #fff;
    height: 20px;
    width: 80px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  button:hover{
    background-color: #41414d;
    color: #fff;
  }
</style>
