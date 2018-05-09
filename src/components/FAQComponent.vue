<template>
  <div>
    <h1 id="faq-container">FAQ</h1>

    <div v-for="f of faqs" class="toc">
      <a class="is-primary" @click='scrollMeTo(f.title)'>{{f.title}}</a>
    </div>
    <hr/>
    <faq-elem v-for="f of faqs" :key="f.title" v-bind="f" :ref="f.title">

    </faq-elem>
  </div>
</template>

<script>
import Vue from 'vue'
var TWEEN = require('@tweenjs/tween.js');

var FAQElem = Vue.component('faq-elem',{

  props:['title','__content'],
  data(){
    return {
      flash:1
    }
  },
  methods:{
    startFlash:function(){
      this.flash = 1;
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween(this)
      .to({flash:0},200)
      .repeat( 1 )
      .yoyo( true )
      .start();

      
      animate();
      
    }
  },
  template : '<div class="box" style="margin:10px"> <h1 :style="{opacity:flash}" style={background-color:red} >{{title}}</h1><p v-html="__content"></p> </div>'
})

var mdObj = {}
function importAll (r) {r.keys().forEach(key => mdObj[key] = r(key))}
importAll(require.context('../md/FAQ/', true, /\.md$/))

export default {
  data () {
    return {
      faqs: mdObj
    }
  },
  components:{FAQElem},
  mounted(){
    console.log(this.faqs)
  },
  methods: {
    scrollMeTo: function (refName) {
      const element = this.$refs[refName][0]
      
      const limit =  Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
      const vph = visualViewport.height;
      function getOffsetTop( elem ) { let offsetTop = 0; do { if ( !isNaN( elem.offsetTop ) ) { offsetTop += elem.offsetTop; } } while( elem = elem.offsetParent ); return offsetTop; }
      let offsetTop = getOffsetTop(this.$el)
      let top = getOffsetTop(element.$el);//.offsetTop
      
      if(limit-top<vph){
        top = limit-vph;
      }
      else{
        

      }
      // top-=offsetTop;

      // let i = window.scrollY
      // const isDown = top > i
      // const sign = isDown ? 1 : -1
      // let lastScrollY = Infinity
      // let smoothScroll = (i) => {
      //   const delta = i - top
      //   const absStep = Math.abs((top - i) * 0.05)
      //   const isMoving = Math.abs(i / top) < 0.5 || lastScrollY != window.scrollY
      //   if (absStep > 2 && isMoving) {
      //     setTimeout(() => {
      //     // console.log(i,absStep, Math.abs(i/top)<.5 || lastScrollY!=window.scrollY)
      //     lastScrollY = window.scrollY
      //     window.scrollTo(0, i)
      //     i += sign * Math.max(1, absStep)
      //     smoothScroll(i, isDown)
      //   }, 10)
      //   } else {
      //     window.scrollTo(0, top);
      //     element.startFlash();

      //   }
      // }
      // smoothScroll(i)
      function animate () {
        if (TWEEN.update()) {
          // console.log('yyyy')
            requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({i:window.scrollY})
      .to({i:top},200)
      .onUpdate((v)=>{
        // console.log(v.i)
        window.scrollTo(0,v.i);
      })
      .onComplete(function(){
         Vue.nextTick(element.startFlash);
      })
      .start();

      animate();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#faq-container{
  scroll-behavior: smooth;
}
ul {
  /*list-style-type: none;*/
  padding: 0;
}
.toc{
  align-content: left;
}

.toc  a {
  margin-left: 20px;
  text-align: left;
  display: block;
  /*color: #42b983;*/
}
</style>
