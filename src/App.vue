<template>
  <div id="app">
    <link rel="icon" type="image/png" href="../assets/logo_small.png" />
    <navbar-component/>
    <router-view id="router-view"/>
    <footer-component/>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {NavbarComponent, FooterComponent}
}
</script>

<style lang="scss">

@import "@/css/config.scss";
@import "bulma";
// @import "~buefy/src/scss/buefy";

#router-view{
  // height:auto;
  min-height: 90vh;//calc( 100% - 3.25rem -10px ); /*7 vh in navbar*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 10px;
  // scroll-behavior: smooth;
}
h1, h2 {
  font-weight: bold;
}

</style>
