<!--NavbarComponent.vue-->
<template>
  <div>
    <b-navbar toggleable type="light" variant="light" sticky role="navigation" aria-label="main navigation">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand  color="primary">
        <!-- <v-toolbar-side-icon @click="showNav = !showNav" aria-label="menu" aria-expanded="false"></v-toolbar-side-icon> -->
        <router-link class="navbar-item" id="logo-main-page" :to="{name:'MainPage'}" ><img src="@/assets/logo_small.png" href="/"></router-link>

        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav class="ml-auto">
            <custom-link to='Projet' text="Projet" />
            <custom-link to='Resources' text="Resources"/>
            <custom-link to='FAQ' text="FAQ"/>
            <custom-link to='Presse' text="Press"/>
            <custom-link to='Contact' text="Contact"/>
            <custom-link to='Forum' text="Forum"/>
            <div class="navbar-item">
              <share></share>
              <div style="margin-left:10px">
                <template v-if="!$store.getters.isLoggedIn">
                  <b-btn v-b-modal.loginComp size="sm">Login</b-btn>
                </template>
                <template v-else>
                  <button  class="button is-small" @click="$store.commit('doLogout')">Logout ({{username}})</button>
                </template>
              </div>

            </div>
          </b-navbar-nav>
        </b-collapse>

      </v-toolbar>

    </b-navbar>


    <b-modal
    lazy
    id="loginComp">

    <login/>

  </b-modal>

</div>
</template>

<script>
import share from './Share.vue'
import Vue from 'vue'
import Login from './LoginComponent'


const customLink = Vue.component('custom-link', {
  template: `<b-nav-item href="#" :to="to" class="navbar-item" :class="{ 'is-active': ($parent.path==to) }" >
  <b-btn variant="outline-danger" >{{text}}</b-btn>
  
  </b-nav-item>
  `,
  props: {
    to: String,
    text: String
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
  },

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
