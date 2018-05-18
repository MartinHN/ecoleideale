<template>
  <div class="hello">
    <h1> admin {{ msg }}</h1>
    <router-link :to="{ name: 'MainPage'}"> return to main page</router-link>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      msg: 'Admin section'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
