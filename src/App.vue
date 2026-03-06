<template>
  <div v-if="type" class="tool-view">
    <button class="back-button" @click="resetSelection">
      &larr; Back to Tools
    </button>
    <Default :type="type" :index="selectedIndex" /> 
  </div>

  <div v-else class="container">
    <div class="header">
      <h1>Select Your Tool</h1>
      <p>Choose a component style to start building.</p>
    </div>

    <div class="card-grid">
      <div
        class="card"
        v-for="(item, index) in tools"
        :key="index"
        @click="chooseType(index)"
      >
        <div class="card-image-wrapper">
          <img :src="getImage(item.src)" :alt="item.alt" /> 
        </div>
        <div class="card-footer">
          <span class="card-title">{{ item.alt }}</span>
          <span class="card-arrow">&rarr;</span>
        </div>
      </div>
    </div>
    <img src="./assets/ShowHeroes-logo-Green.svg" alt="ShowHeroes Logo" class="logo"/> 
  </div>
</template>

<script>
import Default from "./components/Default.vue"; 

export default {
  components: {
    Default, 
  },
  data() {
    return {
      selectedIndex: null,
      type: null,
      tools: [
        { src: "default.png", alt: "Carousel", type: "carousel" },
        { src: "cube.png", alt: "Cube", type: "cube" },
        { src: "fade.png", alt: "Fade", type: "fade" },
        { src: "creative.png", alt: "Creative", type: "creative" },
        { src: "scrollable.png", alt: "Scroller", type: "scroller" },
        { src: "dragdrop.png", alt: "Drag & Drop", type: "drag & drop" },
      ],
    };
  },
  mounted() {
    // Start tracking the mouse when the app loads
    window.addEventListener("mousemove", this.handleMouseMove);
  },
  beforeUnmount() {
    // Clean up the event listener if the component unmounts
    window.removeEventListener("mousemove", this.handleMouseMove);
  },
  methods: {
    chooseType(index) {
      this.selectedIndex = index;
      this.type = this.tools[index].type;
    },
    resetSelection() {
      this.selectedIndex = null;
      this.type = null;
    },
    getImage(image) {
      return new URL(`./assets/${image}`, import.meta.url).href;
    },
    handleMouseMove(event) {
      // Calculate mouse position as a percentage of the viewport
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      
      // Update CSS custom properties on the root element
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

:root {
  /* Default starting positions before the mouse moves */
  --mouse-x: 50%;
  --mouse-y: 20%;
}

body {
  margin: 0;
  padding: 0;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  
  background-color: #0b3144 !important; 
  
  background-image:
    /* 1. Main shifting aurora streak (Follows mouse directly) */
    radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0, 225, 140, 0.1) 0px, transparent 35%),
    /* 2. Secondary deeper glow (Moves inversely for a parallax 3D feel) */
    radial-gradient(circle at calc(100% - var(--mouse-x)) calc(100% - var(--mouse-y)), rgba(11, 49, 68, 0.9) 0px, transparent 40%),
    /* 3. Bright floating light pocket */
    radial-gradient(at 50% 10%, rgba(11, 49, 68, 0.8) 0px, transparent 40%),
    /* 4. The base gradient for depth */
    linear-gradient(135deg, #0b3144 0%, #061a25 100%) !important;

  background-size: 100% 100% !important;
  background-attachment: fixed !important;
  
  /* The "Natural" Aurora Animation (Position removed, just handles color shimmer) */
  animation: auroraShimmer 15s ease-in-out infinite alternate;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  background: transparent; /* Ensures the body gradient shines through */
}
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 { 
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(90deg, #ffffff, #a1a1aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  color: #a1a1aa;
  font-size: 1.1rem;
  margin: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
}

/* --- Glassmorphism Card Design --- */
.card {
  /* 1. Subtle diagonal white gradient for the glass */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
  
  /* 2. The frosted glass blur effect */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); /* Safari support */
  
  /* 3. Semi-transparent white border for the glass edge */
  border: 1px solid rgba(255, 255, 255, 0.15);
  
  /* 4. Top/Left inner highlight for realism, plus a soft drop shadow */
  box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.2), 
              0 8px 32px rgba(0, 0, 0, 0.3);
              
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  /* The glowing cyan hover state */
  border-color: #00e18c;
  box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.2), 
              0 10px 30px rgba(0, 242, 195, 0.25);
}

.card-image-wrapper {
  /* Removed the solid dark background so the glass shows through */
  background: transparent; 
  padding: 2rem 2rem 0rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image-wrapper img {
  width: 100%;
  max-width:200px;
  height: auto;
  transition: transform 0.3s ease;
  /* Adds a slight drop shadow to the icons so they pop off the glass */
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
}

.card:hover .card-image-wrapper img {
  transform: scale(1);
}

/* The distinct darker grounding block for the text */
.card-footer {
  background: rgba(0, 0, 0, 0.4); /* Dark translucent overlay */
  border-top: 1px solid rgba(255, 255, 255, 0.05); /* Subtle separator line */
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: 500;
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0.3px;
}

.card-arrow {
  color: #00e18c;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.tool-view {
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 50;
  background: none;
  border: none;
  color: #a1a1aa;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.logo {
  margin-top: 4rem;
  width: 13rem;
}
.back-button:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  .header h1 {
    font-size: 2rem;
  }
}
</style>