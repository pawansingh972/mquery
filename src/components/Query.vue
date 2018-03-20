<template>
  <div class="query">
    <h1>m{query} - Your mongoDB query generator</h1>
  </div>
</template>

<script>
export default {
  name: 'query',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .query {
    display: table;
    height: 100%;
    width: 100%;
    text-align: center;
  }
  h1 {
    display: table-cell;
    vertical-align: middle;
  }
</style>
