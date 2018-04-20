<!--NavbarComponent.vue-->
<template>
  <div>
    <!-- <server-message/> -->
    <div class="forumPostList">
      <forumpost v-for="value in posts"
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
      posts: [],
      cache:cache
    }
  },

  methods: {
    fetchData: function (parent) {
      var _self = parent || this
      forumAPI.emitCmd('/list', null, (postsOb) => {
        if (postsOb.list) {
          _self.posts = postsOb.list
          console.log('post lists', _self.posts)
        } else {
          console.log('no posts parsed')
        }
      })
    }

  },
  created () {
    console.log('created forum')
    forumAPI.init()

    this.fetchData.bind(this)()
  },
  destroyed () {
    forumAPI.close()
    console.log('destroyed forum')
  }
}
</script>

<style scoped>

</style>
