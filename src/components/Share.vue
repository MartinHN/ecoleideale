<template>
  <div class="share_links">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->

    <!-- <p>je partage</p> -->

    <sharet url="https://monecoleideale.com/"
    title="initiative pour changer le monde"
    description="initiative pour changer le monde"
    quote="initiative pour changer le monde"
    hashtags="ecoleideale"
    twitter-user="ecoleideale"
    googleKey="???"
    networkTag="i"
    inline-template
    >

    <div class="share-container">

      <network network="facebook" >
        <div class="icon-container">
        <font-awesome-icon :icon='["fab","facebook"]' :size="$parent.iconSize"/>
      </div>
      </network>
      <network network="googleplus">
        <font-awesome-icon :icon='["fab","google-plus"]' :size="$parent.iconSize"/>
      </network>
      <network network="twitter">
        <font-awesome-icon :icon='["fab","twitter"]' :size="$parent.iconSize"/>
      </network>
    </div>
  </sharet>

</div>
</template>

<script>

import SocialSharing from 'vue-social-sharing'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fbIconMod from '@fortawesome/fontawesome-free-brands/faFacebook'
import googleIconMod from '@fortawesome/fontawesome-free-brands/faGooglePlus'
import twitterIconMod from '@fortawesome/fontawesome-free-brands/faTwitter'

fontawesome.library.add( fbIconMod,googleIconMod,twitterIconMod)


// SocialSharing.components["network"] = customNetwork;
SocialSharing.components['font-awesome-icon'] = FontAwesomeIcon

export default {
  components: {
    'sharet': SocialSharing

  },
  data () {
    return {
      iconSize: '2x'
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.share-container{
  display: flex;
  justify-content: space-around;
  align-content: center;
  width: 100%;
}
i{
  display: inline-block;
  flex: 0 1 100px;
  margin: 5px;
  cursor: pointer;
/*  width:40px;
  height: 40px*/
/*float:right;*/
/*width:100%;*/
}
.icon-container{
  display: flex;
  justify-content: space-around;
  align-content: center;
  /*margin: auto;*/
}
</style>
