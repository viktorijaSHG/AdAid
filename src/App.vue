<script>

import 'swiper/css/effect-fade';

import WelcomeItem from "./components/WelcomeItem.vue";

 export default (await import('vue')).defineComponent({

  data() {
  
 },



  components: {
    WelcomeItem,
  

  }
 
});
</script>
 
<template>
  <!-- <div v-if="modules"> -->
    <WelcomeItem/>aa
  <!-- </div> -->
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
  
  

 </template>
 

 <style scoped>
.ImageButton{
  width: 200px;
  width: 200px;
}

 </style>