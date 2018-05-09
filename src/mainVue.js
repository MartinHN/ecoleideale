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
    addToast(state,el){
      console.log(el)
      const existing  = state.toasts.find(e=>el.message===e.message && el.type===e.type)
      
      if(!existing){
        state.toasts.splice(state.toasts.length,0,el)
      }
      else{
        Object.assign( existing,{t:null})
        existing.num++;
        console.log('repeat toast',existing)
      }
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
    addToastWithType(t,obj,type){
      if(typeof t !== "string" && ! ('servermsg' in t)){t=JSON.stringify(t)}
        if(obj){t+=" " +JSON.stringify(obj)}
          this.addToast({message:t['servermsg'] || t,type,num:1})
      },
      addErrorToast:function(t,obj){
        this.addToastWithType(t,obj,'is-danger')
      },
      addInfoToast:function(t,obj){
        this.addToastWithType(t,obj,'is-info')
      },
      addSuccessToast:function(t,obj){
        this.addToastWithType(t,obj,'is-success')
      },
    }
  })
window.events = VueInstance

/* eslint-disable no-new */
export default VueInstance
