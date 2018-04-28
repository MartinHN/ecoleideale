<template>
  <div class='carousel-view'>
    
    <transition-group
      name='carousel'
      class='carousel'
      tag="div">
      <div
        v-for="(slide, index) in slides" 
        class='slide'
        :key="slide.id">
        <img class='slide__image' :src='slide.imgLink'>
      </div>
    </transition-group>
    <div class='carousel-controls'>
      <button class='button' @click="previous">prev</button>
      <button class='button' @click="next">next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',

  data () {
    return {
      slides: [
        {
          imgLink: require('@/assets/logo.png'),
          id: 1
        },
        {
          imgLink: require('@/assets/logo.png'),
          id: 2
        },
        // {
        //   imgLink: require('./assets/logo.png'),
        //   id: 3
        // },
        // {
        //   imgLink: require('./assets/logo.png'),
        //   id: 4
        // },
        // {
        //   imgLink: require('./assets/logo.png'),
        //   id: 5
        // }
      ]
    }
  },

  methods: {
    next () {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)
    },
    previous () {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)
    }
  }
}
</script>

<style scoped>


.carousel-view {
  height: 100vh;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  align-items: center;
  background-image: radial-gradient(rgba(176, 212, 214, 1) 20%, transparent 0);
  background-size: 20em 20em;
  background-position: left;
}


.carousel {
  display: flex;
  justify-content: center;
  align-items: center;

  /*width: 25em;
  min-height: 25em;*/

  /*border: 1em dashed #BACAB9;*/
  overflow: hidden;
  /*background-color: #83B4AE;*/
}

.slide {
  transform: translateZ(0) scale(1.0, 1.0);
  height: 20em;
  border: 0.6em dashed #A47565;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  opacity: 1;

  margin: 1em;
  flex: 0 0 20em;
}

.slide:first-of-type {
  opacity: 0;
}

.slide:last-of-type {
  opacity: 0;
}

.slide__image {
  width: auto;
  height: 110%;
  display: flex;
}

.carousel-controls {
  margin: 2em;
}




@keyframes underlineToDots {
  0% {
    text-decoration: underline;
    text-decoration-style: dashed;
  }
  100% {
    text-decoration-style: solid;
  }
}


</style>