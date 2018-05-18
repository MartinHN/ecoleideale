<template>
  <div>
  <h1 class="page-header">Ressources</h1>
  <div class="md-content" v-html="content.__content"></div>
</div>
</template>

<script>
const resourcesObj = require('@/md/Resources.md')
export default {
  data () {
    return {
      content:resourcesObj,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
