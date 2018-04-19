<!--NavbarComponent.vue-->
<template>
  <div class="band">
    <nav class="navbar is-fixed-top " role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name:'MainPage'}" ><img src="../assets/logo_small.png" href="/"></router-link>

        <div role="button" class="navbar-burger" :class="{ 'is-active': showNav }" @click="showNav = !showNav" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end" @click="showNav=false">
          <custom-link to='Projet'>QUOI?</custom-link>
          <custom-link to='Resources'>Comment?</custom-link>
          <custom-link to='FAQ'>FAQ</custom-link>
          <custom-link to='Presse'>Presse</custom-link>
          <custom-link to='Contact'>Contact</custom-link>
          <custom-link to='Forum'>Forum</custom-link>
          <template v-if="!$store.state.loggedIn">
            <button  class="button" @click="isShowingLogin=true">Login</button>
          </template>
          <template v-else>
            <span>bonjour</span>
            <br/>
            <span>{{username}}</span>
          </template>
          <share></share>
        </div>

        <!-- <span class="hline"/> -->
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
import share from "./Share.vue"
import Vue from 'vue'
import Login from './LoginComponent'

const customLink = Vue.component('custom-link', {
  template: `<router-link :to="to" class="navbar-item" :class="{ 'is-active': ($parent.path==to) }" >
  <slot></slot>
  </router-link>
  `,
  props: {
    to: String,
  },
  methods:{
    click: function () {
      console.log(this.to)
    }
  }
});

export default {
  components:{share,customLink,Login},
  data () {
    return {
      isShowingLogin:false,
      loggedIn:false,
      username:"johny",
      showNav: false,
      path:""
    }
  },
  updated () {
    console.log('update nav')
  },
  watch:{
    $route (to, from){
      this.path=to.name
    }
  }
  
}
</script>

<style scoped >

.navbar{
  border-bottom: 1px solid red;
}
.navbar-end{
  /*background:red;*/
  margin-left: 0;
  justify-content: space-between;
  width:100%;
}
.hline {
  display:inline-block;
  width:100%;
  height:3px;
  background: red;
}
img{
  display: block;
  margin: 0 auto;
  max-height: 7vh;
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
