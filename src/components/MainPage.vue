<template>
  <div >
    <div id="mainpage">
      <button id="participate" class="button is-primary" @click="$router.push('propositions')"  > Je Participe </button>

      <div id="slidersContainers">
        <div id="comment-box" class="box">
          <carousel  :per-page="1" autoplay autoplayHoverPause navigationEnabled mouse-drag :autoplayTimeout="4000" :paginationEnabled="false">
            <slide v-for="s of comments" :key="s.id">

<!--               <h2>{{s.title}}</h2>
              <div class="columns">
                <div class="column is-one-quarter">
                  <img v-show="s.photo" :src="s.photo" style="width:100px;">
                </div>
                <div class="column">
                  <p v-html="s.__content" style="margin-left:10px"></p>
                </div>
              </div>
              <em>{{s.author}}</em> -->
              <!-- <div class="card" > -->
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img v-show="s.photo" :src="s.photo" style="width:100px;">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{s.title}}</p>
                      <p class="subtitle is-6">{{s.author}}</p>
                    </div>
                  </div>

                  <div v-html="s.__content"></div>
                </div>
              <!-- </div> -->
            </slide>
          </carousel>
        </div>
        <div id="propositions-box" class="box">
          <carousel :per-page="1" autoplay autoplayHoverPause  navigationEnabled mouse-drag :autoplayTimeout="5000" :paginationEnabled="false">
            <slide v-for="s of propositions" :key="s.id">
              <h2>{{s.number}}. {{s.parsedTitle}}</h2>
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
  align-content: center;
  width: 100%;
  
}

pre, code{
  padding:0;
  max-width: 100%;
}

#participate{

  /*width:100%;*/
  flex:1 1 40vh;
  margin: 10px;
  background-color: #BE0004
}

#slidersContainers{
  flex:1 1 300px;
  /*margin:10px;*/
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  /*align-items:stretch;
  align-content:stretch;*/
  
}
#slidersContainers > .box{
  margin:10px;
  box-sizing: border-box;
  /*min-height: 30vh;*/
  /*flex:1 1 450px;*/
  flex-basis: 100%;
  max-width: 100vw;
  
}
/*@media screen and (min-width: 800px) {
  #slidersContainers > .box {
    flex: 1;
  }
}*/

#propositions-box{
  background-color: #5A89E6
}
#comment-box{
  background-color: #FAD354
}
.card{
  background-color: transparent;
}
.VueCarousel{
  height: 100%;
  /*display: block;*/
  /*overflow-y: 1;*/
}

</style>
