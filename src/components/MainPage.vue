<template>
  <div >
    <div id="mainpage">
      <button id="participate" class="button is-primary" @click="$router.push('propositions')"  > Je Participe </button>

      <div id="slidersContainers" >
        <div class="row">
          <div id="comment-box" class="box col">
            <b-carousel 
            img-width="100vw"
            img-height="30vh"
            style="text-shadow: 1px 1px 2px #333;"
            controls
            indicators
            background="transparent"
            :interval="4000"
            >
            <b-carousel-slide  img-blank v-for="s of comments" :key="s.id">

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
            </b-carousel-slide>
          </b-carousel>

        </div>
        <div id="propositions-box" class="box col">
          <b-carousel img-width="100vw"
          img-height="30vh"
          style="text-shadow: 1px 1px 2px #333;"
          controls
          indicators
          background="transparent"
          :interval="4000">
          <b-carousel-slide img-blank v-for="s of propositions" :key="s.id">
            <h2>{{s.number}}. {{s.parsedTitle}}</h2>
            <div class="html-slide" v-html="s.__content"></div>
            <em>{{s.author}}</em>
          </b-carousel-slide>
        </b-carousel>
      </div>
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
<style >
#mainpage{
  display: flex;
  flex-direction: column;
  /*margin-top: 10px;*/
  height:90vh; /*fullscreen is 90%ofvh (navbar=10vh)*/
  align-content: center;
  width: 100%;
  
}


.carousel-caption{
  /*max-height: 20vh;*/
  overflow-y: scroll;
  bottom:auto;
  top:10px;
}
pre, code{
  padding:0;
  max-width: 100%;
}

#participate{

  /*width:100%;*/
  height:  30vh;
  margin: 10px;
  background-color: #BE0004
}

#slidersContainers{
  height: 60vh;
  margin:10px;
  width: 100%;
  
 /* display: flex;
  flex-direction:row;
  flex-wrap: wrap;
 */ 
}
.row{
  margin:10px;
  height: 100%;
}
.carousel.slide{
  height: 100%;
}
.carousel-inner{
height: 100%;
}
#slidersContainers > .box{
  margin:10px;
  height: 100%;
  /*box-sizing: border-box;*/
  /*min-height: 20vh;*/
  /*flex:1 1 450px;*/
  flex-basis: 100%;
  max-width: 100vw;
  
}
/*
@media screen and (min-width: 800px) {
  #slidersContainers > .box {
    flex: 1;
  }
  }
  */

  #propositions-box{
    background-color: #5A89E6
  }
  #comment-box{
    background-color: #FAD354
  }
  .card{
    background-color: transparent;
  }

  </style>
