<template>
  <div >
    <div id="mainpage">
      <div id="participate" >
        <button class="button is-primary" @click="$router.push('propositions')"  > Je Participe </button>
      </div>
      <div id="slidersContainers">
        <div  id="comment-box" class="sliderContainer box has-background-tercero">
          <carousel  :per-page="1" autoplay autoplayHoverPause navigationEnabled mouse-drag :autoplayTimeout="4000" :paginationEnabled="false">
            <slide class="slide" v-for="s of comments" :key="s.id">
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
            </slide>
          </carousel>
        </div>
        <div class="sliderContainer box has-background-secondary" id="propositions-box">

          <carousel :per-page="1" autoplay autoplayHoverPause  navigationEnabled mouse-drag :autoplayTimeout="5000" :paginationEnabled="false">
            <slide class="slide" v-for="s of propositions" :key="s.id">
              <div class="box">
                <h2 class="title is-8">{{s.number}}. {{s.parsedTitle}}</h2>
                <div v-html="s.__content"></div>
                <em>{{s.author}}</em>
              </div>
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
  flex: 1 1 0;
  align-content: center;
  
  
}

/*// pre, code{
  //   padding:0;
  //   max-width: 100%;
  // }*/

  #participate{
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    flex: .6 1 0;
    box-sizing:border-box;
    display: flex;
    flex-direction: column;

  }
  #participate .button{
    flex: 1 1 0;
  }

  #slidersContainers{
    flex: 1 1 0;
    padding:5px;

    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    max-width:100%;
    /*justify-content: space-between;*/
    /*align-content:stretch;*/


  }
  #slidersContainers > .sliderContainer{
    flex: 1 1 0;
    max-width:calc(100% - 10px);
    /*max-height: 10px;*/
    
    margin:5px;

    /*box-sizing:border-box;*/

  }

  .slide{
    padding:10px;
    width:100px;
  }

/*@media screen and (min-width: 800px) {
  #slidersContainers > .box {
    flex: 1;
  }
  }*/


  .card{
    /*background-color: transparent;*/
  }
  .VueCarousel{
    height: 100%;
    
    /*display: block;*/
    overflow-y: scroll;
    overflow-x: scroll;
  }

</style>
