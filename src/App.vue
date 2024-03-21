<template>
  <div class="container">
     <div v-if="selectedIndex">
       <WelcomeItem :modulesIndex="selectedIndex"/>
     </div>
     <div v-else class="image-grid">
       <div class="image-container" v-for="(image, index) in images" :key="index">
         <img :src="image.src" :alt="image.alt">
         <button @click="chooseType(index+1)" class="hidden-button">Choose</button>
       </div>
     </div>
  </div>
 </template>
 
 <script>
 import WelcomeItem from "./components/WelcomeItem.vue";
 
 export default {
  data() {
     return {
       selectedIndex: null,
       images: [
         { src: "/src/assets/default.png", alt: "Default" },
         { src: "/src/assets/cube.png", alt: "Cube" },
         { src: "/src/assets/fade.png", alt: "Fade" },
         // Add more images as needed
       ]
     }
  },
  components: {
     WelcomeItem,
  },
  methods: { 
     chooseType(index) {
       this.selectedIndex = index;
     }
  }
 };
 </script>
 
 <style scoped>
 .container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
 }
 
 .image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
 }
 
 .image-container {
  position: relative;
  display: inline-block;
  margin: 10px;
 }
 
 .image-container img {
  width: 100%;
  height: auto;
  transition: opacity 0.5s, transform 0.5s;
 }
 
 .image-container:hover img {
  opacity: 0.5;
  transform: scale(1.05);
 }
 
 .hidden-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
 }
 
 .image-container:hover .hidden-button {
  opacity: 1;
 }
 
 @media (max-width: 768px) {
  .image-grid {
     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
 }
 </style>
 