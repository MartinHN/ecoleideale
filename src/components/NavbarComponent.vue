<!--NavbarComponent.vue-->
<template>
  <div>
    <nav class="navbar is-fixed-top " role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" id="logo-main-page" :to="{name:'MainPage'}" ><img src="@/assets/logo_small.png" href="/"></router-link>

        <div role="button" class="navbar-burger" :class="{ 'is-active': showNav }" @click="showNav = !showNav" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end" @click="showNav=false">
          <custom-link to='Projet'>Le projet</custom-link>
          <custom-link to='Resources'>Resources</custom-link>
          <custom-link to='FAQ'>FAQ</custom-link>
          <custom-link to='Presse'>Presse</custom-link>
          <custom-link to='Contact'>Contact</custom-link>
          <custom-link to='Forum'>Forum</custom-link>
          <div class="navbar-item">
            <share></share>
            <div style="margin-left:10px">
              <template v-if="!$store.getters.isLoggedIn">
                <button  class="button is-small" @click="isShowingLogin=true">Login</button>
              </template>
              <template v-else>
                <button  class="button is-small" @click="$store.commit('doLogout')">Logout ({{username}})</button>
              </template>
            </div>
          </div>
        </div>

      </div>

    </nav>
    <b-modal :active.sync="isShowingLogin">
      <div class="box is-4by3">
        <login/>
      </div>
    </b-modal>

  </div>
</template>

<script>
import share from './Share.vue'
import Vue from 'vue'
import Login from './LoginComponent'
import Buefy from 'buefy'

const customLink = Vue.component('custom-link', {
  template: `<router-link :to="to" class="navbar-item" :class="{ 'is-active': ($parent.path==to) }" >
  <slot></slot>
  </router-link>
  `,
  props: {
    to: String
  },
  methods: {
    click: function () {
      console.log(this.to)
    }
  }
})

const modalComp = Vue.component(Buefy.Modal.name, Buefy.Modal); 
export default {
  components: {share, customLink, Login},
  data () {
    return {
      isShowingLogin: false,
      
      showNav: false,
      path: ''
    }
  },
  computed:{
    username:function(){
    return this.$store.state.user.name;
  }

},
  updated () {
    // console.log('update nav')
  },
  watch: {
    $route (to, from) {
      this.path = to.name
    }
  }

}
</script>

<style scoped >
button{
  align-self: center;
}
.navbar{
  border-bottom: 1px solid black;
}

.navbar-burger{
  height: 10vh;
}
.navbar-end{
  /*background:red;*/
  margin-left: 0;
  text-align: center;
  justify-content: space-between;
  width:100%;
}
nav{
  height: 10vh;
  min-height: 10vh;
}
.navbar-brand{
  min-height: 10vh; /*????*/
  /*height:100%;*/
}
#logo-main-page >img{

  max-height: 9vh;
}

#logo-main-page {
  max-height: 10vh;
}
/*
a {
  color: #222222;
  text-decoration: none;
}

nav{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  }*/
  </style>
