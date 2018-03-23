<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    color: #343a40;
    background-color: #fdfdfd;
  }

  #app {
    height: 100%;
  }

  #header {
    box-shadow: 0px 5px 10px 0px rgba(0,64,128,0.05);
    height: 65px;
  }

  #header h4 {
    line-height: 65px;
  }

</style>
