<!--NavbarComponent.vue-->
<template>
  <div class="proposition-overview">
    <div class="columns">
      <div class="column button" v-for="t of tags" :key="t.id" style="margin:10px">

        <div class="media">{{t.name}}</div>
        <div  class="is-subtitle" >({{t.num}})</div>
      </div>
    </div>
  </div>

</template>

<script>

import propositionAPI from '../api/propositions'


export default {
  name: 'proposition-overview',
  components: {},
  data () {
    return {
      tags:{}
    }
  },
  methods: {


  },
  watch:{

  },
  computed:{

  },
  created () {

    this.tags = propositionAPI.getAllTags();

  }
}
</script>

<style scoped>
.column {
  /*display: block;*/
  /*margin: auto;*/
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
