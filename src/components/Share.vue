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

    <div>

      <network network="facebook" >
        <font-awesome-icon :icon="$parent.fbIcon" :size="$parent.iconSize"/>
      </network>
      <network network="googleplus">
        <font-awesome-icon :icon="$parent.googleIcon" :size="$parent.iconSize"/>
      </network>
      <network network="twitter">
        <font-awesome-icon :icon="$parent.twitterIcon" :size="$parent.iconSize"/>
      </network>
    </div>
  </sharet>

</div>
</template>

<script>

import SocialSharing from 'vue-social-sharing'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
// import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'
import fbIconMod from '@fortawesome/fontawesome-free-brands/faFacebook'
import googleIconMod from '@fortawesome/fontawesome-free-brands/faGooglePlus'
import twitterIconMod from '@fortawesome/fontawesome-free-brands/faTwitter'

// SocialSharing.components["network"] = customNetwork;
SocialSharing.components['font-awesome-icon'] = FontAwesomeIcon

export default {
  components: {
    'sharet': SocialSharing,
    FontAwesomeIcon

  },
  data (){
    return {
      iconSize:"2x"
    }
  },
  computed: {
    fbIcon () { return fbIconMod },
    googleIcon () { return googleIconMod },
    twitterIcon () { return twitterIconMod }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


i{
  display: inline-block;
/*  width:40px;
  height: 40px*/
/*float:right;*/
/*width:100%;*/
}
</style>
