<template>
  <div>
    <!-- <h1> login </h1> -->
    <br/>
    <div class="columns">
      <div class="column">
        <h3 class="title is-8">j'ai déjà un compte</h3>
        <form ref="loginForm" id="loginForm" :action="loginServer" method="post" class="formInputs">
          <div class="field">
            <div class="control">
              <input ref="loginid" type="text" class="input" name="loginid" placeholder="mail ou nom d'utilisateur" @keyup="changeLoginForm" autocomplete="email" />
            </div>
            <p class="help is-danger">{{login_uname_error}}</p>
          </div>

          <div class="field">
            <div class="control">
              <input ref="login_pass" type="password" class="input" name="logpass" placeholder="mot de passe" @keyup="changeLoginForm" autocomplete="current-password" />
            </div>
            <p class="help is-danger">{{login_pass_error}}</p>
          </div>
        </form>
        <button @click="sendLogin" @touch="sendLogin" class="button validateButton" >se connecter</button>
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
        </form>
        <button  name="register" @click="sendRegister" @touch="sendRegister" class="button validateButton" >s'inscrire</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import _ from  'lodash'

const checkMinLength = function (s) {
  if (s === '') { return 'veuillez renseigner ce champ' }
    if (s.length < 4) { return 'champ trop court' }
      return ''
  }

// const checkPassword = function (s) {

// }

var validateLogin = function () {
  var vm = this
  // console.log(vm)
  const obj = vm.$refs.loginid
  
  var error = checkMinLength(obj.value)


  vm.login_uname_error= error;

  var isValid = true
  isValid &= (error === '')
  return isValid
}

const validateRegister = function () {
  var vm = this
  // console.log(vm)
  const obj = vm.$refs.register_uname
  var error = checkMinLength(obj.value)
  vm.register_uname_error = error;

  var isValid = true
  isValid &= (error === '')
  return isValid
}

export default {
  data () {
    return {
      loginServer: 'http://127.0.0.1:3000/api/user',
      login_uname_error:'',
      login_pass_error:'',
      register_uname_error:'',
      register_pass_error:'',


    }
  },
  methods: {
    changeLoginForm: function () { return _.debounce(validateLogin.bind(this), 300)() },
    changeRegisterForm: function () { return _.debounce(validateRegister.bind(this), 300)() },
    sendLogin: function () { console.log(this); if (validateLogin.bind(this)()) { this.$refs.loginForm.submit() } },
    sendRegister: function () { if (validateRegister.bind(this)()) { this.$refs.registerForm.submit() } }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  </style>
