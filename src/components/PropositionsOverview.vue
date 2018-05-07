<!--NavbarComponent.vue-->
<template>
  <div class="proposition-overview">
    <div id="page-split" class="">
      <!-- taglist -->
      <div class=" is-half tag-list">
        <div class="button is-info is-rounded is-outlined tag-element" v-for="t of tags" :key="t.name" @click="openTag(t)" :ref="t.name" style="margin:1px">
          {{t.name}} ({{t.num}})

        </div>
      </div>
      <!-- Inspector -->
      <div ref="inspector" id="inspector" class=""> 
        <h1 ref="inspector-title"></h1>

        <div class="card" v-for="t of relatedPropositions" :key="t.number" @click="" :ref="t.parsedTitle" >

          <div class="media">{{t.parsedTitle}}</div>
          <div class="card-content" v-html="t.__content"/>

          <!-- <div class="media-content" v-if="openedTag===t">Im open</div> -->

        </div>
      </div>
    </div>
    <div id="vote-button">
      <div class="buttons is-centered">
      <div class="button" @click="start_survey()"> c'est parti !</div>
      </div>
    </div>
  </div>

</template>

<script>

import propositionAPI from '../api/propositions'
import query from '@/api/query'

export default {
  name: 'proposition-overview',
  components: {},
  data () {
    return {
      tags:{},
      openedTag:'',
      relatedPropositions:[]
    }
  },
  methods: {
    openTag:function(tag){
      // console.log(tag)
      if(this.openedTag){this.closeTag(this.openedTag);}
      
      const domEl = this.$refs[tag.name][0]
      // console.log(domEl.classList)
      // domEl.classList.remove("is-info")
      domEl.classList.remove("is-outlined")
      this.$refs['inspector-title'].innerHTML = tag.name
      this.openedTag =tag;
      
    },
    closeTag(tag){
      const domEl = this.$refs[tag.name][0]
      if(domEl){
        // domEl.classList.add("is-info")
        domEl.classList.add("is-outlined")
       // domEl.style.isActive=false
     }
   },
   start_survey(){
    const args = {test:'argvalue'}
    const url = 'vote' +query.buildArgsFromObj(args)
    this.$router.push(url)
   }

 },
 watch:{
  openedTag(to){
    this.relatedPropositions = propositionAPI.getAllPropositionsForTagName(this.openedTag.name)
    console.log(this.relatedPropositions ,"open change")
  }
},
computed:{

},
created () {

  this.tags = propositionAPI.getAllTags();

}
}
</script>

<style scoped lang="scss">
$split :70vh;

#page-split{
  height: $split;
  max-height: $split;
}
#vote-button{
  height: 100vh- $split - 10vh;

}
.tag-list{
  width:40vw;
  margin: 10px;
  flex-wrap: wrap;
  float:left;
  overflow-y: scroll;
  max-width: 50vw;
  
  max-height: $split;
  /*display: flex;*/
}
#inspector{
  margin: 10px;
  width:50vw;
  overflow-y: scroll;
  max-height: $split - 5vh;
  /*flex-wrap: wrap;*/
  float:left;


}
.tag-element {
  /*display: block;*/
  /*margin: auto;*/
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  /*flex-basis:25vw;*/
  flex-grow: 0;
  /*height: 100px;*/


}
</style>
