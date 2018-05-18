<template>
  <div >
    <div class="centered">
      <div class="spacer"/>
      <h1 class="endVote title">Merci ! vous avez fini le vote</h1>
      <div class="spacer"/>
      <router-link class="button is-primary is-outlined" to="/">revenir à la page d'acceuil</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spacer {
  flex:1 0 10px;
}
.centered{
  margin: 10px;
  flex:1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  text-align: center;
  line-height: 100px;


}
.centered *{
  flex: 1 0 10px;
  
}

.router-link-active{
  flex-grow: 3;
}
</style>
