<!--NavbarComponent.vue-->
<template>
  <div>
    <nav class="navbar card is-fixed-top " role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" id="logo-main-page" :to="{name:'MainPage'}" ><img class="button" src="@/assets/logo_small.png" href="/" style="height:100%;padding:0"></router-link>
        <share class="share navbar-item" ></share>
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
            <a  v-if="!$store.getters.isLoggedIn" class="navbar-item" @click="isShowingLogin=true">Login</a>
            <a  v-else class="navbar-item" @click="$store.commit('doLogout')">Logout ({{username}})</a>
          </div>
        </div>

      </div>

    </nav>
    <div class="modal" :class="{'is-active':isShowingLogin}">
      <div class="modal-background" @click="isShowingLogin=false"></div>
      <div class="modal-content box is-4by3">
       <component @shouldClose="isShowingLogin=false" :is="isShowingLogin?loginComponent:null"></component> 
     </div>
   </div>

 </div>
</template>

<script>
import share from './Share.vue'
import Vue from 'vue'
import Login from './LoginComponent'


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


export default {
  components: {share, customLink, Login},
  data () {
    return {
      isShowingLogin: false,
      loginComponent:Login,
      showNav: false,
      path: ''
    }
  },
  computed:{
    username:function(){
      return this.$store.state.user.name;
    }

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
  /*border-bottom: 1px solid black;*/
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
.share{
  display: flex;
  flex-grow: 1;
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
