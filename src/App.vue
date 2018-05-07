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
// Import Bulma's core

@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #BE0004;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);
$navbar-item-color : "red";
// $navbar-height: 7vh;
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$modal-content-spacing-mobile: 100px;
$modal-content-spacing-tablet:100px;


// / for vote section
$tabs-toggle-link-active-background-color: lightgray;
$tabs-toggle-link-active-border-color: lightgray;
// $tabs-boxed-link-active-background-color: lightgray;
// Import Bulma and Buefy styles
@import "bulma";
@import "~buefy/src/scss/buefy";


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
