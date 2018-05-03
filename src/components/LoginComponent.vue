<template>
  <div>
    <!-- <h1> login </h1> -->
    <br/>
    <h1 v-if="isConnectedToServer=='error'"> pas de connection au server</h1>
    <b-loading v-else-if="isConnectedToServer=='waiting'" :is-full-page="false" :active="true"> waiting</b-loading>

    <div v-else class="columns">
      <div class="column">
        <h3 class="title is-8">j'ai déjà un compte</h3>
        <form ref="loginForm" id="loginForm" :action="loginServer" class="formInputs">
              <input ref="loginid" type="text" class="input" name="loginid" placeholder="mail ou nom d'utilisateur" @keyup="changeLoginForm" autocomplete="username" />
            <p class="help is-danger">{{login_uname_error}}</p>

              <input ref="logpass" type="password" class="input" name="logpass" placeholder="mot de passe" @keyup="changeLoginForm" autocomplete="current-password" />
            <p class="help is-danger">{{login_pass_error}}</p>
          <div class="buttons is-centered">
            <button type="submit" @click="sendLogin" @touch="sendLogin" class="button validateButton" >se connecter</button>
          </div>
        </form>

      </div>

      <div class="column">
        <h3 class="title is-8">je crée un compte</h3>
        <form ref="registerForm" id="registerForm" :action="loginServer" class="formInputs" method="post">
          <input ref="register_uname" type="text" name="username" placeholder="nom d'utilisateur" @keyup="changeRegisterForm" autocomplete="username" class="input"/>
          <div   ref="register_uname_err" class="error"/>
          <input ref="register_mail" type="text" name="email" placeholder="addresse mail" @keyup="changeRegisterForm" autocomplete="email" class="input"/>
          <div   ref="register_mail_err" class="error"/>
          <input ref="register_pass" type="password" name="pass" placeholder="mot de passe" @keyup="changeRegisterForm" autocomplete="current-password" class="input"/>
          <div   ref="register_pass_err" class="error"/>
          <input ref="register_passConf" type="password" name="passConf" placeholder="confirmer mon mot de passe" @keyup="changeRegisterForm" autocomplete="current-password" class="input"/>
          <div   ref="register_passConf_err" class="error"/>
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
var debounce = require('lodash.debounce')

const checkMinLength = function (s) {
  if (s === '') { return 'veuillez renseigner ce champ' }
    if (s.length < 4) { return 'champ trop court' }
      return ''
  }

// const checkPassword = function (s) {
// }

var validateLogin = function () {
  var vm = this
  const obj = vm.$refs.loginid

  var error = checkMinLength(obj.value)

  vm.login_uname_error = error

  var isValid = true
  isValid &= (error === '')
  return isValid
}

const validateRegister = function () {
  var vm = this
  const obj = vm.$refs.register_uname
  var error = checkMinLength(obj.value)
  vm.register_uname_error = error

  var isValid = true
  isValid &= (error === '')
  return isValid
}

export default {
  data () {
    return {
      loginServer: usersAPI.url,
      isConnectedToServer: 'waiting',
      login_uname_error: '',
      login_pass_error: '',
      register_uname_error: '',
      register_pass_error: '',
      serverMessage:''

    }
  },
  methods: {
    changeLoginForm: function () { return debounce(validateLogin.bind(this), 300)() },
    changeRegisterForm: function () { return debounce(validateRegister.bind(this), 300)() },
    sendLogin: function (e) {  
      if (e.preventDefault) e.preventDefault();
      const vm = this
      if (validateLogin.bind(this)()) {
       // this.$refs.loginForm.submit()
       // const fo2 = document.getElementById("loginForm")
       const fo = vm.$refs.loginForm;
       const fd = new FormData();
       const rawData = {'loginid':vm.$refs.loginid.value,'logpass':vm.$refs.logpass.value}
       for(var d in rawData){
        fd.append(d,rawData[d]) 
      }
       // console.log(vm.$refs.loginid.value,fo,rawData,fd)
       usersAPI.tryToLogin(rawData,
        (user)=>{
          this.$toast.open({
            message: 'connecté comme '+user.name,
            type: 'is-success'
          })
          vm.$store.commit('doLogin',user);
          vm.$parent.close()

        },
        (err)=>{
          this.$toast.open({
            message: err.servermsg,
            type: 'is-danger'
          })
        }
        ) 
     } 
   },
   sendRegister: function (e) {
   if (e.preventDefault) e.preventDefault();
  if (validateRegister.bind(this)()) { this.$refs.registerForm.submit() } 
}
 },
 watch: {
  isConnectedToServer: function (to, from) {
      // debugger
      console.log('connection status', to)
    }
  },
  mounted () {
    const vm = this
    usersAPI.isConnectedToServer((obj) => { vm.isConnectedToServer = 'success' }, () => { vm.isConnectedToServer = 'error' })
    // check error in redirections
    var url = window.location.pathname
    var getQuery = url.split('?')[1]
    if(getQuery){
      var params = getQuery.split('&') 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
