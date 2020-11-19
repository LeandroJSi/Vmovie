<template>
  <header class="header">
  <router-link class="link" to="/"><img class="logo" src="@/assets/logo.png" alt=""></router-link>
    <ul class="menu">
        <li><router-link class="link" to="/">Home</router-link></li>  
        <li><router-link class="link" to="/filmes">Movies</router-link></li>
        <li><router-link class="link" to="/series">Series</router-link></li>
        <li><router-link class="link" to="/favorite">Favorites</router-link></li>
    </ul>
  </header>
</template>

<script>

export default {

}

</script>


<style>
  .header{
    grid-area: header;
    background-color:#14141c;
    display: flex;
    justify-content:left;
    align-items: center;
    padding-left: 8px;
  }
  .menu {
    padding:0px 10px;
    margin:0px;
    list-style:none;
}
  .menu li { 
    display: inline;
    margin: 10px;
    border: none;
  }
  .menu li a{
    padding: 2px 10px;
    display: inline-block;
    font-size: 18px;
    font-weight: bolder;
    
    color:#cdcdd1;
    text-decoration: none;
  }
  .menu li a:hover {
    color: #6D6D6D;
  }
  .logo{
    width: 180px;
  }
</style>