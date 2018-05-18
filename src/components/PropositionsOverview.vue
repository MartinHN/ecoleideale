<!--NavbarComponent.vue-->
<template>
  <div class="proposition-overview">
    <div id="page-split" class="">
      <!-- taglist -->
      <div class="tag-list box">
        <div class="button is-rounded is-outlined tag-element" :class="getColor(i)" v-for="(t,i) of orderedTags" :key="t.name" @click="openTag(t)" :ref="t.name" style="margin:1px">
          {{t.name}} ({{t.num}})

        </div>
      </div>
      <!-- Inspector -->
      <div  ref="inspector" id="inspector" class=""> 

        <div id='inspector-header'>

          <h1 ref="inspector-title" ></h1>
          <div v-if="openedTag" class="button is-primary is-outlined" @click="start_survey(openedTag.name)" style="float:right;" > voter pour cette categorie</div>
        </div>

        <transition-group apear name="component-fade">
          <div class="box" v-for="t of relatedPropositions" :key="t.number" @click="" :ref="t.parsedTitle" >

            <h1 class="media">{{t.parsedTitle}}</h1>
            <div class="card-content" v-html="t.__content" ></div>
          </div>
        </transition-group>
        

        

      </div>
    </div>

    <div id="vote-button" class="box has-background-primary">
      <div class="button is-outlined" @click="start_survey('all')"> je vote pour toutes</div>
    </div>

  </div>
</div>

</template>

<script>

import propositionAPI from '../api/propositions'
import query from '@/libs/query'

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
   start_survey(type){
    if(type==='all')type=propositionAPI.allTag.name
      const url = 'vote' +query.buildArgs({type})
    this.$router.push(url)
  },
  getColor(i){
    const colors=['is-info','is-danger','is-black','is-success']
    return colors[i%colors.length]
  }

},
watch:{
  openedTag(to){
    this.relatedPropositions = propositionAPI.getAllPropositionsForTagName(this.openedTag.name)
    // console.log(this.relatedPropositions ,"open change")
  }

},
computed:{
  orderedTags(){
    const res  = []
    const cmp=(a,b)=>{
      if (a.name < b.name )
        return -1;
      if (a.name > b.name )
        return 1;
      return 0;
    }
    
    for(const t in this.tags){
      if(t!=propositionAPI.allTag.name)
        res.push(this.tags[t]);
    }

    res.sort(cmp)
    res.splice(0,0,propositionAPI.allTag)
    return res;

  }

},
created () {

  this.tags = propositionAPI.getAllTags();


},
mounted(){
  this.openTag(propositionAPI.allTag)
}
}
</script>

<style scoped lang="scss">
// @import "@/css/config.scss";
$split :80vh;

.box{
  // margin:10px;
}
#page-split{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: $split;
  max-height: $split;
}

.tag-list{
  width:100%;
  padding: 3px;
  flex-wrap: wrap;
  overflow-y: scroll;
  max-height: $split;
  flex: 1 0 10vh;
  background-color:#F4F4F4;

}
#inspector{
  margin: 3px;
  // width:50vw;
  overflow-y: scroll;
  max-height: $split - 5vh;
  /*flex-wrap: wrap;*/
  // float:left;

  flex: 3 0 30vw;
  flex-direction: row;


}

#vote-button{

  position: fixed;
  padding: 10px;
  height: 100vh - $split - 10vh;;
  bottom: 0;
  left: 0;
  right: 0;



}
#inspector-header{
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  margin: 10px;
}

#inspector-header h1 {
  display:table-cell; 
  vertical-align:middle;
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



.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
