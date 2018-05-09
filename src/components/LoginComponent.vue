<template>
  <div>
    <!-- <h1> login </h1> -->
    <br/>
    <h1 v-if="isConnectedToServer=='error'"> pas de connection au server</h1>
    <div class="loading" v-else-if="isConnectedToServer=='waiting'" :is-full-page="false" :active="true"> waiting</div>

    <div v-else class="columns">
      <div class="column">
        <h3 class="title is-8">j'ai déjà un compte</h3>
        <form ref="loginForm" id="loginForm"  class="formInputs">

          <input v-model="login_uname" type="text" class="input" name="loginid" placeholder="mail ou nom d'utilisateur" autocomplete="username" />
          <p class="help is-danger">{{login_uname_err}}</p>

          <input v-model="login_pass" type="password" class="input" name="logpass" placeholder="mot de passe" autocomplete="current-password" />
          <p class="help is-danger">{{login_pass_err}}</p>

          <div class="buttons is-centered">
            <button type="submit" @click="sendLogin" @touch="sendLogin" class="button validateButton" >se connecter</button>
          </div>
        </form>

      </div>

      <div class="column">
        <h3 class="title is-8">je crée un compte</h3>
        <form ref="registerForm" id="registerForm" class="formInputs" method="post">

          <input v-model="register_uname" type="text" name="username" placeholder="nom d'utilisateur"  autocomplete="username" class="input"/>
          <p class="help is-danger">{{register_uname_err}}</p>

          <input v-model="register_mail" type="text" name="email" placeholder="addresse mail" autocomplete="email" class="input"/>
          <p class="help is-danger">{{register_mail_err}}</p>

          <input v-model="register_pass" type="password" name="pass" placeholder="mot de passe" autocomplete="current-password" class="input"/>
          <p class="help is-danger">{{register_pass_err}}</p>
          
          <input v-model="register_passConf" type="password" name="passConf" placeholder="confirmer mon mot de passe" autocomplete="current-password" class="input"/>
          <p class="help is-danger">{{register_passConf_err}}</p>

          <div class="buttons is-centered">
            <button type="submit" name="register" @click="sendRegister" @touch="sendRegister" class="button validateButton" >s'inscrire</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>

import usersAPI from '@/api/users'
import query from '@/libs/query'
// var debounce = require('lodash.debounce')

const checkMinLength = function (s) {
  if (s === '') { return 'veuillez renseigner ce champ' ;}
  if (s.length < 4) { return 'champ trop court' ;}
  return '';
}
const isMail = (m)=>{
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(m)

}

// const checkPassword = function (s) {
// }


export default {
  data () {
    return {
      isConnectedToServer: 'waiting',
      login_uname:'',
      login_pass:'',
      register_uname:'',
      register_pass:'',
      register_passConf:'',
      register_mail:'',
      serverMessage:'',
      hasTriedToLog:false,
      hasTriedToRegister:false,

    }
  },
  computed:{
    login_uname_err(){
      const v = this.login_uname
      if(!this.hasTriedToLog && v===""){return ''};
      return checkMinLength(v);
    },
    login_pass_err(){
      const v = this.login_pass
      if(!this.hasTriedToLog && v===""){return ''};
      return checkMinLength(v);
    },
    register_uname_err(){
      const v = this.register_uname
      if(!this.hasTriedToRegister && v==="" ){return ''};
      return checkMinLength(v);
    },
    register_pass_err(){
      const v = this.register_pass
      if(!this.hasTriedToRegister && v==="" ){return ''};
      return checkMinLength(v);
    },
    register_passConf_err(){
      const v = this.register_passConf
      if(!this.hasTriedToRegister && v==="" ){return ''};
      if(this.register_pass!=this.register_passConf){return 'mot de passe différent'}
        return checkMinLength(v);
    },
    register_mail_err(){
      const v = this.register_mail
      if(!this.hasTriedToRegister && v==="" ){return ''};
      if(!isMail(v))return 'mail non valide'
        return checkMinLength(v);
    },
    log_isValid(){
      return this.login_uname_err==='' && this.login_pass_err===""
    },
    register_isValid(){
      return this.register_uname_err==='' && this.register_pass_err==="" && this.register_passConf_err==='' && this.register_mail_err===""
    },
  },
  methods: {
    sendLogin: function (e) {  
      this.hasTriedToRegister=false;
      this.hasTriedToLog=true;
      if (e.preventDefault) e.preventDefault();
      const vm = this
      if (vm.log_isValid) {
        // this.$refs.loginForm.submit()
        // const fo2 = document.getElementById("loginForm")
        const fo = vm.$refs.loginForm;
        const rawData = {'loginid':vm.login_uname,'logpass':vm.login_pass}
        // const fd = new FormData();
        // for(var d in rawData){
        //   fd.append(d,rawData[d]) ;
        // }
        // console.log(vm.$refs.loginid.value,fo,rawData,fd)
        usersAPI.tryToLogin(rawData,
          (user)=>{
            this.$root.addToast({
              message: 'connecté comme '+user.name,
              type: 'is-success'
            })
            vm.$store.commit('doLogin',user);
            vm.$emit('shouldClose')

          },
          (err)=>{
            this.$root.addToast({
              message: err.servermsg,
              type: 'is-danger'
            })
          }
          ) 
      } 
    },
    sendRegister: function (e) {
      if (e.preventDefault) e.preventDefault();
      this.hasTriedToRegister=true;
      this.hasTriedToLog=false;
      if (this.register_isValid) { 
      // :  this.$refs.registerForm.submit() 
      
      const rawData = {'username':this.register_uname,'pass':this.register_pass,'email':this.register_mail}
      // const fd = new FormData();
      // for(var d in rawData){
      //   fd.append(d,rawData[d]);
      // }
      usersAPI.registerUser(rawData,(u)=>{
        this.$root.addSuccessToast("bienvenue "+ u.name)
        this.$emit('shouldClose')
      },
      (err)=>{
        this.$root.addErrorToast(err)
      })
    }

  }
},
watch: {
  isConnectedToServer: function (to, from) {
    console.log('connection status', to)
  }
},
mounted () {
  const vm = this
  usersAPI.isConnectedToServer((obj) => { vm.isConnectedToServer = 'success' }, () => { vm.isConnectedToServer = 'error' })
// check error in redirections
const params = query.getCurrentArgs()
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
