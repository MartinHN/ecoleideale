<!--NavbarComponent.vue-->
<template>
  <div class="proposition-overview">
    <div id="page-split" class="">
      <!-- taglist -->
      <div class=" is-half tag-list">
        <div class="button is-rounded is-outlined tag-element" :class="getColor(i)" v-for="(t,k,i) of tags" :key="t.name" @click="openTag(t)" :ref="t.name" style="margin:1px">
          {{t.name}} ({{t.num}})

        </div>
      </div>
      <!-- Inspector -->
      <div  ref="inspector" id="inspector" class=""> 
        <div id='inspector-header'>
          
          <h1 ref="inspector-title" ></h1>
          <div v-if="openedTag" class="button is-primary is-outlined" @click="start_survey(openedTag.name)" style="float:right;" > voter pour cette categorie</div>
        </div>
        

        <div class="box" v-for="t of relatedPropositions" :key="t.number" @click="" :ref="t.parsedTitle" >

          <h1 class="media">{{t.parsedTitle}}</h1>
          <div class="card-content" v-html="t.__content"/>

          <!-- <div class="media-content" v-if="openedTag===t">Im open</div> -->

        </div>
      </div>
    </div>
    <!-- <div id="vote-button" class="message is-primary">
      <div class="message-header"> -->
        <div class="box has-background-primary">
          <div class="button is-outlined" @click="start_survey('all')"> je vote pour toute</div>
        </div>
        <!-- </div> -->
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
    const url = 'vote' +query.buildArgs({type})
    this.$router.push(url)
  },
  getColor(i){
    const colors=['is-info','is-danger','is-success','is-warning']
    return colors[i%colors.length]
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
// @import "@/css/config.scss";
$split :70vh;

.box{
  margin:10px;
}
#page-split{
  height: $split;
  max-height: $split;
}
#vote-button{
  height: 100vh - $split - 10vh;

}
#inspector-header{
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  margin: 10px;
}
#inspector-header h1 {display:table-cell; vertical-align:middle}
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
