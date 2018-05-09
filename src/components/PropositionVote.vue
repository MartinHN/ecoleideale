<!--NavbarComponent.vue-->
<template>
  <div class="proposition-page">
    <div class="" id="header">

      <div class="card-content" id="content-header">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{title}}</p>
            <div class="tags">
              <div class="tag" v-for="t of tags" :key="t.id"  >{{t}}</div>
            </div>
          </div>
        </div>

        <div v-html="content" ></div>
      </div>
      <img id="img-header" src="http://placeholder.pics/svg/300/DEDEDE/555555/image du vote"></img>
    </div>
    <div class="card vote card-content">
      <div class="tabs is-toggle is-toggle-rounded is-fullwidth" >
        <ul>
          <li @click="rate='OK'" ref="OK">
            <a>
              <font-awesome-icon color="green" icon="thumbs-up" :size="iconSize" />
            </a>
          </li>
          <li  @click="rate='NO'" ref="NO">
            <a>
              <font-awesome-icon color="red"  icon="thumbs-down" :size="iconSize"/>
            </a>
          </li>
          <li  @click="rate='NA'" ref="NA">
            <a>
              <font-awesome-icon color="gray"  icon="thumbs-down" :rotation="90" :size="iconSize"/>
            </a>
          </li>
        </ul>
      </div>
      <div class="vote-text-button " style="margin: 10px;display:flex;flex-direction: row;flex-wrap: wrap;">
        <div style="flex:1 0 50vw">
          <textarea  class="textarea" v-model.lazy="remarks"  ref="remarks" name="remarks" placeholder="remarques" />
        </div>
        <div style="flex:1 0 4vw">
          <div class="buttons is-centered" style="">
            <div class="button" @click="doVote()">  Vote suivant</div>
          </div>
        </div>
      </div>
    </div>


    <!-- <div v-html="defaultText"></div> -->
  </div>
</template>

<script>
import query from '@/libs/query'
import propositionAPI from '@/api/propositions'
import voteSession from '@/libs/voteSession'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import thumbsUpIco from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import thumbsDownIco from '@fortawesome/fontawesome-free-solid/faThumbsDown'
fontawesome.library.add( thumbsUpIco,thumbsDownIco)


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
      rate:"",
      remarks:''
    }
  },
  methods: {
    doVote(){
      const that = this;
      if(this.voteIsValid){
        voteSession.voteInSession(this.proposition_id,this.voteObj,()=>{
          voteSession.getNextVoteIdInSession(
            (nextVoteId)=>{
              this.$root.addSuccessToast('vote pris en compte ')
              that.proposition_id=nextVoteId;
            },
            (end)=>{
              that.$router.push('endVote')
            })
        },(err)=>{
          this.$root.addErrorToast('probleme de connection au serveur : ',err)
          voteSession.getNextVoteIdInSession((nextVoteId)=>{
            that.proposition_id=nextVoteId;
          },
          (end)=>{that.$router.push('endVote')})
        }
        )
      }
      else{
        this.$root.addErrorToast("vous n'avez pas voté")
      }
    },

  },
  watch:{
    proposition_id(to,from){
      propositionAPI.getPropositionFromId(to)
      .then(prop=>{
        this.title = prop.parsedTitle
        this.tags = prop.tags
        this.content = prop.__content
        voteSession.getLastVoteFromId(to)
        .then((v)=>{
          this.rate=v.rate || "NONE"
          this.remarks=v.remarks || ""
        })
        .catch((err)=>{
          this.rate="NONE"
          this.remarks=""
          if(err!="not found"){console.error(err)}
        })


      }).
      catch(err=>console.error(err))
    },
    rate(to,from){
      const ori = this.$refs[from];
      if(ori) { ori.classList.remove('is-active'); }
      const dest = this.$refs[to];
      if(dest){dest.classList.add('is-active');}
      else if(to!="NONE"){console.error("radio bug","f",from,"t",to,this)}

    },
    // remarks(to){
    //   console.log(to)
    // }
  },
  computed:{
    voteObj(){
      return {rate:this.rate,remarks:this.remarks}
    },
    voteIsValid(){
      return this.rate!=="NONE"
    }

  },
  mounted () {
    if(!voteSession.isValid()){
      const args=query.getCurrentArgs()
      voteSession.init(()=>{
        if(args && ('type' in args)){
          voteSession.startSession(args['type'],()=>{
            voteSession.getNextVoteIdInSession(
              id=>{
                console.log("init session with id",id)
                this.proposition_id =id
              },
              err=>{console.error(err)})
          })
        }

      })
    }
    else if(voteSession.getCurrentVoteId()){
      this.proposition_id =voteSession.getCurrentVoteId();
    }
    else{
      console.error("vote not initialized properly")
    }

  },
  unmounted(){
    voteSession.invalidate();
  }
}
</script>

<style scoped lang="scss">

$vote-height:35vh;

.proposition-page{
  max-height: 90vh;
}

#header {
  display: flex;
  flex-direction: row;
  max-height: 100vh-10vh-$vote-height;
  overflow-y: scroll;

}

.b-tabs.is-fullwidth .tab-content{
  height:0px;
  padding:0px;
}
.b-tabs.is-fullwidth {
  margin-bottom: 3px;
}


#content-header{
  /*float:left;*/
  flex: 1 1 75vw;
}
#img-header {

  flex: 1 1 25vw;
}
.vote{
  position: fixed;
  padding: 10px;
  height: $vote-height;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

}
.vote-text-button{
  flex: 1 3 0;
  
}

</style>
