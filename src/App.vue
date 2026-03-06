<template>
  <div v-if="type">
    <Default :type="this.type" :index="this.selectedIndex" /> 
  </div>

  <div v-else class="container">
    <h1 class="pb-5">Select Your Tool</h1>
    <div class="image-grid">
      <div
        class="image-container"
        v-for="(image, index) in images"
        :key="index"
        @click="chooseType(index)"
      >
        <img :src="getImage(image.src)" :alt="image.alt" /> 
      </div>
    </div>
  </div>
</template>

<script>
import Default from "./components/Default.vue"; 

export default {
  data() {
    return {
      selectedIndex: null,
      type: null,
      images: [
        { src: "default.png", alt: "Default" },
        { src: "cube.png", alt: "Cube" },
        { src: "fade.png", alt: "Fade" },
        { src: "creative.png", alt: "Creative" },
        { src: "scrollable.png", alt: "Scroller" },
        { src: "dragdrop.png", alt: "DragDrop" },
        // Add more images as needed
      ],
    };
  },
  components: {
    Default, 
  },
  methods: {
    chooseType(index) {
      this.selectedIndex = index;
      if (this.selectedIndex == 0) {
        this.type = "carousel";
      } else if (this.selectedIndex == 1) {
        this.type = "cube";
      } else if (this.selectedIndex == 3) {
        this.type = "creative";
      } else if (this.selectedIndex == 4) {
        this.type = "scroller";
      } else if (this.selectedIndex == 5) {
        this.type = "drag & drop";
      } else {
        this.type = "fade";
      }
    },
    getImage(image) {
      return new URL(`./assets/${image}`, import.meta.url).href;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
</style>
<style>
body {
  background-color: #0b3144 !important;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* This makes the container take up the full viewport height */
  flex-direction: column;
  /* This ensures the content is centered vertically */
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(
    3,
    minmax(12.5rem, 1fr)
  ); /* 200px is approximately 12.5rem */
  gap: 1rem;
  width: 50rem; /* 40% of viewport width */
  height: auto; /* 40% of viewport height */
}

.image-container {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.image-container img {
  width: 100%;
  height: auto;
  transition: opacity 0.3s, transform 0.3s;
  cursor: pointer;
}

.image-container:hover img {
  opacity: 0.9;
  transform: translateY(-6%);
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
h1 { 
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-size: 2.5rem;
  font-weight: 400;
  color: #e8e8e8; 
}
</style>
