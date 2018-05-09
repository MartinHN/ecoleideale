<template>
  <div>
  <h1 class="hello">Contact</h1>
  <div v-html="content.__content"></div>
</div>
</template>

<script>
const mdObj = require('@/md/Contact.md')
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
