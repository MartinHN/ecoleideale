<template>
  <div id="app">
   <transition-group apear name="list">
    <div v-for="(m,i) of $store.state.toasts" 
    class="toast is-rounded is-fullwidth" 
    :class="m.type" 
    :style="{top:20+i*60+'px'}" 
    :key="i" 
    @click="$store.commit('removeToastAtIdx',i)">
    {{m.message}}
    <div v-if="m.num>1">&nbsp({{m.num}})</div>
  </div>
</transition-group>
<link rel="icon" type="image/png" href="../assets/logo_small.png" />
<navbar-component/>
<router-view id="router-view"/>
<footer-component/>
</div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {NavbarComponent, FooterComponent},
  data () {
    return {
      toasts:[]//{text:"lalal",t:new Date(),dur:1000},{text:"lolo",is_success:true,t:new Date(),dur:4000}]
    };
  },
  mounted(){

    // window.setTimeout(()=>{
    //   // this.toasts.splice(this.toasts.length,0,
    //   this.$root.addErrorToast("laljhqslkqdhslksdjlqskjdmqljqdslkdsqj qslkhdjqsdqjmdqldqsml")
    // }
    //   ,200)
    // window.setTimeout(()=>{
    //   this.$root.addSuccessToast("lao" )},1200)
    
  },
  computed:{

  },
  methods:{

  },
  watch:{

  }


}
</script>

<style lang="scss">

@import "@/css/config.scss";
@import "bulma";
// @import "~buefy/src/scss/buefy";

#router-view{
  // height:auto;
  min-height: 90vh;//calc( 100% - 3.25rem -10px ); /*7 vh in navbar*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 10px;
  // scroll-behavior: smooth;
}
h1, h2 {
  font-weight: bold;
}

.toast{
  @extend .button;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.92;
  animation-duration: 1s;

}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .5s;

}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
