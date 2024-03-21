<script>

import 'swiper/css/effect-fade';

import WelcomeItem from "./components/WelcomeItem.vue";



 export default (await import('vue')).defineComponent({

  
  data() {
    return {
  selectedIndex: null
    }
 },



  components: {
    WelcomeItem,
  

  },
  methods: { 
    chooseType(type) {
            this.selectedIndex = type
        }
    }
});

</script>
 
<template>
  <div v-if="selectedIndex">
    <WelcomeItem :modulesIndex="selectedIndex"/>aa
  </div>
  <!-- <div v-else>bbb -->
        <!-- <label>
          <input type="radio" value="0" v-model="modules" checked > basic
       </label>
       <label>
          <input type="radio" value="1" v-model="modules" > cube
       </label>
       <label>
          <input type="radio" value="2" v-model="modules"> fade
       </label>
       <label>
          <input type="radio" value="3" v-model="modules"> Option 4
       </label>
       <label>
          <input type="radio" value="4" v-model="modules"> Option 5
       </label>
  </div> -->
  <div v-else>

    <div class="image-container">
      <img src="/src/assets/default.png" alt="Your Image">
      <button @click="chooseType(1)" class="hidden-button" >Choose</button>
    </div>

    <div class="image-container">
      <img src="/src/assets/cube.png" alt="Your Image">
      <button @click="chooseType(2)" class="hidden-button" >Choose</button>
    </div>

    

    <div class="image-container">
      <img src="/src/assets/cube.png" alt="Your Image">
      <button @click="chooseType(3)" class="hidden-button" >Choose</button>
    </div>
  </div>



 </template>
 

 <style scoped>
 .image-container {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.image-container img {
  width: 400px;
  height: auto;
  transition: opacity 1s;
}

.image-container:hover img {
  opacity: 0.5;
}

.hidden-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 1s;
}

.image-container:hover .hidden-button {
  opacity: 1;
}

 </style>