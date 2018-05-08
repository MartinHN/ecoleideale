<!--NavbarComponent.vue-->
<template>
  <div >
    <form id="forumPostEditor" ref="form" method="post" :action="posturl">
      <input class="input" type="text" ref="title"  name="title" placeholder="titre" />
      <input class="input" type="textarea" ref="content" name="content" placeholder="contenu" />
      <button type="submit" class="button"> ajout de post</button>

    </form>
    <!-- <div v-html="defaultText"></div> -->
  </div>
</template>

<script>
import forumAPI from '../api/forum'
// import axios from 'axios';
export default {
  name: 'forumpost',
  components: {},
  data () {
    return {
      posturl: forumAPI.url + '/add'
    }
  },
  methods: {

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
