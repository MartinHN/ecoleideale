<template>
  <div class="hello">
    <h1 v-for="m in msg" :key="m.str">{{ m.str }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    let msgData = [{str: 'Ecole idéale msg i'}]
    for (var i = 0; i < 100; i++) {
      msgData.push({str: 'Ecole idéale msg ' + i})
    }
    // console.log(msgData)
    // msgData = msgData.join(' \n')
    // console.log(msgData)
    return {
      msg: msgData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  min-height: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
