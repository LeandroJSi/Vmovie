<template>
  <footer class="footer">
    <span>Copyright © Leandro Silva</span>
  </footer>  
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
  .footer{
    grid-area: footer;
    background-color:#14141c;
    color: #fff;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
  }
</style>