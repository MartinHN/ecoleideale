<template>
  <div class="hello">
    <h1> not found {{ msg }}</h1>
  </div>
</template>

<script>
export default {

  data () {
    return {
      msg: 'Ecole idéale ne trouve pas la page recherchée '
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
