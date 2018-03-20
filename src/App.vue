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
    margin: 0;
    padding: 0;
    color: #263646;
    background-color: #fdfdfd;
  }

  #app {
    height: 100%;
  }
</style>
