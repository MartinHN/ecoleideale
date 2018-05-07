<!--NavbarComponent.vue-->
<template>
  <div class="proposition">
    <div class="card" id="header">

      <div class="card-content" id="content-header">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{title}}</p>
            <b-taglist>
              <b-tag v-for="t of tags" :key="t.id"  >{{t}}</b-tag>
            </b-taglist>
          </div>
        </div>

        <div v-html="content" ></div>
      </div>
      <img id="img-header" src="http://placeholder.pics/svg/300/DEDEDE/555555/image du vote"></img>
    </div>
    <div class="card vote">
      <div class="card-content">
        <b-tabs  type="is-toggle-rounded" v-model="radioButton" expanded >

          <b-tab-item label="Ok" >
            <template slot="header">
              <font-awesome-icon color="green" icon="thumbs-up" :size="iconSize" />
            </template>
          </b-tab-item>
          <b-tab-item label="No">
            <template slot="header">
              <font-awesome-icon color="red"  icon="thumbs-down" :size="iconSize"/>
            </template>
          </b-tab-item>
          <b-tab-item label="NoVote" :visible="false"/>
          <b-tab-item native-value="Maybe">
            <template slot="header">
              <font-awesome-icon color="gray"  icon="thumbs-down" :rotation="90" :size="iconSize"/>
            </template>
          </b-tab-item>
        </b-tabs>
        <b-input v-model.lazy="remarks" type="textarea" ref="remarks" name="remarks" placeholder="remarques" />
      </div>
      <div class="buttons is-centered">
          <div class="button" > Vote </div>
        
      </div>
    </div>
    <!-- <div v-html="defaultText"></div> -->
  </div>
</template>

<script>

import propositionAPI from '../api/propositions'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import thumbsUpIco from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import thumbsDownIco from '@fortawesome/fontawesome-free-solid/faThumbsDown'
fontawesome.library.add( thumbsUpIco,thumbsDownIco)

const lbrRe = new RegExp('\\\\n', 'g')
function replacelbr (str) {str = str.replace(lbrRe, '<br/>') ; return str}

export default {
  name: 'proposition',
  components: {FontAwesomeIcon},
  data () {
    return {
      title: null,
      tags:[""],
      content: 'none',
      proposition_id:-1,
      iconSize:"2x",
      radioButton: 2,
      voteType:'',
      remarks:''
    }
  },
  methods: {
    getCurrentVote(){
      switch(this.radioButton){
        case 0: return "Ok"
        case 1: return "No"
        case 2: return ""
        case 3: return "NA"
        default: console.error("wrong vote")
      }
    }
  },
  watch:{
    proposition_id(to,from){
      const prop = propositionAPI.getPropositionFromId(to);
      this.title = prop.parsedTitle
      this.tags = prop.tags
      this.content = prop.__content
    },
    // currentVote(to,from){
    //   console.log(to)
    // },
    // remarks(to){
    //   console.log(to)
    // }
  },
  computed:{
    currentVote(){
      return this.getCurrentVote()
    }
  },
  mounted () {
    if(this.proposition_id<0){
      this.proposition_id = propositionAPI.getFirstId();
    }
    
  }

}
</script>

<style scoped >

#header {
  display: flex;
  flex-direction: row;

}
#content-header{
  /*float:left;*/
  flex: 1 1 75vw;
}
#img-header {
  
  flex: 1 1 25vw;
}
.column {
  /*display: block;*/
  /*margin: auto;*/
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
