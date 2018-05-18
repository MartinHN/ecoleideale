<template>
  <div>
  <h1 class="page-header">Projet</h1>
  <div class="md-content" v-html="content.__content"></div>
</div>
</template>

<script>
const mdObj = require('@/md/Projet.md')
export default {
  data () {
    return {
      content:mdObj,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
