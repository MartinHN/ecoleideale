<template>
  <div>
  <h1 class="page-header">Presse</h1>
  <div class="md-content" v-html="content.__content"></div>
</div>
</template>

<script>
const mdObj = require('@/md/Presse.md')
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
