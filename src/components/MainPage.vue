<template>
  <div >
    <div id="mainpage">
      <button id="participate" class="button is-primary" @click=""  > Je Participe </button>

      <div id="slidersContainers">
        <div id="comment-box" class="box">
          <carousel  :per-page="1" autoplay mouse-drag :paginationEnabled="false">
            <slide v-for="s of comments" :key="s.id">
              <h2>{{s.title}}</h2>
              <div v-html="s.__content"></div>
              <em>{{s.author}}</em>
            </slide>
          </carousel>
        </div>
        <div id="propositions-box" class="box">
          <carousel :per-page="1" autoplay mouse-drag :paginationEnabled="false">
            <slide v-for="s of propositions" :key="s.id">
              <h2>{{s.number}}. {{s.title}}</h2>
              <div v-html="s.__content"></div>
              <em>{{s.author}}</em>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const CommentMdObj = {}
function importAll (r,obj) {r.keys().forEach(key => obj[key] = r(key))}
importAll(require.context('@/md/peer-comments/', true, /\.md$/),CommentMdObj)

import propositionsApi from '@/api/propositions'
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'MainPage',
  components:{Carousel,Slide},
  data () {
    return {
      comments:CommentMdObj
      ,
      propositions:propositionsApi.getPropositions()
    }
  },
  mounted(){
    console.log(CommentMdObj)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainpage{
  display: flex;
  flex-direction: column;
  /*margin-top: 10px;*/
  height:90vh; /*fullscreen is 90%ofvh (navbar=10vh)*/

}
#participate{

  /*width:100%;*/
  
  flex:1 1 40vh;
  margin: 10px;
  background-color: #BE0004
}

#slidersContainers{
  flex:1 1 auto;
  
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  align-items:stretch;
  align-content:stretch;
  
}
#slidersContainers > .box{
  min-height: 30vh;
  margin: 10px;
  flex:1 1 450px;
}

#propositions-box{
  background-color: #5A89E6
}
#comment-box{
  background-color: #FAD354
}


</style>
