<template>
  <div>
  <h1 class="hello">FAQ</h1>
  <div v-for="f of faqs">
    <h1>{{f.attributes.title}}</h1>
    <p>{{f.body}}</p>
  </div>
</div>
</template>

<script>

var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

// const ex = require('!!json-loader!front-matter!../md/FAQ/1.md')
// const ex = require('yaml-frontmatter-loader!../md/FAQ/1.md')
importAll(require.context('../md/FAQ/', true, /\.md$/));
export default {
  data () {
    return {
      faqs:cache
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
