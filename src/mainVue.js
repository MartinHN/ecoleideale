// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'

import App from './App'
import router from './router'

Vue.use(Buefy)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: {name:'',mail:''}
  },
  mutations: {
    doLogin (state,payload) {
      console.log(payload)
      state.user.name = payload.name
      state.user.mail = payload.mail

    },
    doLogout (state) {
      state.user.name='';
      state.user.mail='';
    }
  },
  getters:{
    isLoggedIn : state=>{
      return state.user && state.user.name!=''
    }
  }
})

const VueInstance = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window.events = VueInstance
window.events.flash = function (message) {
  console.log('flash', message)
}

/* eslint-disable no-new */
export default VueInstance
