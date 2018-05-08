// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
// import Buefy from 'buefy'

import App from './App'
import router from './router'

// Vue.use(Buefy)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: {name:'',mail:''},
    toasts:[]
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
    },
    addToast(state,payload){
      console.log(payload)
      state.toasts.splice(state.toasts.length,0,payload)
    },
    removeToastAtIdx(state,payload){
      const i =payload
      state.toasts.splice(i,1)
    }
  },
  getters:{
    isLoggedIn : state=>{
      return state.user && state.user.name!=''
    },
    hasNewMessage: state=>{
      return state.length
    }


  }
})


const VueInstance = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods:{
    addToast:function(t){
      // debugger
      const that = this;
      const watchToast = (time)=>{
        const toasts = that.$store.state.toasts
        const watch = (time)=>{
          const cd = time || new Date();
          for(const ct of toasts){
            ct.t = ct.t || cd;
            ct.dur=ct.dur || 2000;

            const delta = cd - ct.t

            if(delta > ct.dur ){
              const t = toasts.indexOf(ct)
              toasts.splice( t,1);
            }
          }
          if(toasts.length){
            window.setTimeout(watch,100);
          }
        }
        watch()
      }

      this.$store.commit('addToast',t)
      watchToast();

    },
    addErrorToast:function(t){
      this.addToast({message:t,type:'is-danger'})
    },
    addInfoToast:function(t){
      this.addToast({message:t,type:'is-info'})
    },
    addSuccessToast:function(t){
      this.addToast({message:t,type:'is-success'})
    },
  }
})
window.events = VueInstance
window.events.flash = function (message) {
  console.log('flash', message)
}

/* eslint-disable no-new */
export default VueInstance
