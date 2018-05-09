<!--NavbarComponent.vue-->
<template>
  <div >
    <form id="forumPostEditor" ref="form" method="post">
      <input class="input" type="text" ref="title"  name="title" placeholder="titre" />
      <input class="input" type="textarea" ref="content" name="content" placeholder="contenu" />
      <div type="submit" class="button" @click.stop="publishPost()"> ajout de post</div>

    </form>
    
  </div>
</template>

<script>
import forumAPI from '../api/forum'

export default {
  name: 'forumpost',
  components: {},
  props:['related_proposition'],
  data () {
    return {
      
    }
  },
  methods: {
    publishPost(){
      forumAPI.sendPost({related_proposition:this.related_proposition,title:this.title,content:this.content,},
        (success)=>{this.$root.addSuccessToast("posté")},
        (err)=>{this.$root.addErrorToast( err)},
        )
    }

  }

}
</script>

<style scoped>
#forumPostEditor{
  display: flex;
  flex-direction: column;
  height: 50vh;

}
</style>
