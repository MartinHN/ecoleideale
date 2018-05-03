<!--NavbarComponent.vue-->
<template>
  <div>
    <!-- <server-message/> -->
    
    <div class="forumPostList">
      <forumpost v-for="value in postIds"
      :key="value"
      :id="value"
      />
    </div>

    <br/>
    <posteditor/>
  </div>
</template>

<script>
import forumPost from './ForumPost.vue'
import forumPostEditor from './ForumPostEditor.vue'
import forumAPI from '../api/forum'
import ServerMessage from './ServerMessage.vue'



// import Vue from 'vue'
export default {
  components: { forumpost: forumPost, posteditor: forumPostEditor, ServerMessage },
  data () {
    return {
      postIds: [],
    }
  },

  methods: {
    fetchData: function () {

      
    }

  },
  mounted () {
    const that = this
    forumAPI.init(()=>{
      that.postIds=forumAPI.postIds
    })
    
  },
  destroyed () {
    forumAPI.close()
    
  }
}
</script>

<style scoped>

</style>
