<template>
  <div class="container">
    <div v-if="type">
      <Images @images-updated="updateImages"/> 
       <Default :images="images" :type="this.type" :index="this.selectedIndex"/>
       <div class="flex-container" >       
       </div>
     </div>
     <div v-else class="image-grid">
       <div class="image-container" v-for="(image, index) in images" :key="index">
         <img :src="image.src" :alt="image.alt">
         <button @click="chooseType(index)" class="hidden-button">Choose</button>
       </div>
     </div>
  </div>
</template>

<script>
import Default from "./components/Default.vue";
import Images from "./components/Images.vue";

export default {
  data() {
    return {
      selectedIndex: null,
      type: null,
      images: [
        { src: "/src/assets/default.png", alt: "Default" },
        { src: "/src/assets/cube.png", alt: "Cube" },
        { src: "/src/assets/fade.png", alt: "Fade" },
        // Add more images as needed
      ],


      
    };
     

    
  },
  components: {
    Default,
    Images,
  },
  methods: {
    chooseType(index) {
      this.selectedIndex = index;
      if (this.selectedIndex == 0){
        this.type = 'multiple'
      }
      else{
        this.type = 'single'
      }
    },
    updateImages(newImages) {
      this.images = newImages;
    },
  },
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
 
 .flex-container {
  display: flex;
  flex-wrap: wrap; /* Allows the items to wrap as needed */
  justify-content: space-between; /* Adds space between the items */
 }

 @media (max-width: 768px) {
  .image-grid {
     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
 }
 </style>
 