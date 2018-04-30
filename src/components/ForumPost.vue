<!--NavbarComponent.vue-->
<template>
  <div class="forumPost">
    <div class="card">
 <!--  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div> -->
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="@/assets/logo_small.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{postTitle}}</p>
        <p class="subtitle is-6">@{{postAuthor}}</p>
      </div>
    </div>

    <div class="content" v-html="content" style="float:left">
    </div>
  </div>
</div>
    <!-- <div v-html="defaultText"></div> -->
  </div>
</template>

<script>
import forumAPI from '../api/forum'
// import Vue from 'vue'
const lbrRe = new RegExp('\\\\n', 'g')
function replacelbr (str) {
  str = str.replace(lbrRe, '<br/>')
  return str
}
export default {
  name: 'forumpost',
  components: {},
  props: ['id'],
  data () {
    return {
      postTitle: null,
      postAuthor:"john",
      content: 'none'
    }
  },
  methods: {
    fetchData: function (parent) {
      var _self = parent || this
      // console.log("t",this)
      // console.log("_s",_self)
      // console.log("s",self)
      var id = _self.id
      console.log(id)
      forumAPI.emitCmd('/get', {id: id}, (o) => {
        if (o) {
          // if(self.postTitle != o.title){console.error("wrong content")}
          _self.postTitle = o.title
          _self.postAuthor = o.author
          if (o.content) { o.content = replacelbr(o.content) }

          _self.content = o.content
        } else {
          console.log('no obj parsed')
        }
      })
    }
  },

  created () {
    // this.defaultText = replacelbr('lala\\nk k')
    // weird state error if this not passed as arg
    this.fetchData.bind(this)()
  }
}
</script>

<style scoped>

</style>
