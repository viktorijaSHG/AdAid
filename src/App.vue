<script>
import {Swiper, SwiperSlide, useSwiper} from "swiper/vue"
import { EffectCube,  EffectFade, Navigation, Pagination} from 'swiper/modules';
import { watch } from 'vue';

import 'swiper/css/effect-fade';

import 'swiper/css/effect-cube';
import 'swiper/css';
import 'swiper/css/navigation';

 export default (await import('vue')).defineComponent({
  data(){
    return {
      swiperRef: null,
      images:[],
      isDragging:false,
      // imgs,
       EffectCube,
       EffectFade,
       Navigation,
      Pagination,
      modules:0,
      loopVar:false,
      slideCount:1,
      autoplay:true,
      autoplayDelay:2000,
      spaceBetweenSlides: 10,
      sliderWidth: 230,
      sliderHeight: 310,
      buttonVar: false,
      buttonX: 0,
      setWrapperSize:200,
      offset:0,
      positionTop: 200,
      positionLeft: 400,
      swiper: null,
      background: null,
      modulesOptions: [
      [Navigation],
      [Navigation, EffectCube],
      [],
      [],
      []
    ],
    }
    },

    watch: {
  modules(newModules) {
    if (this.swiperRef) {
      const newModulesConfig = this.modulesOptions[newModules];
      this.swiperRef.update({
        modules: newModulesConfig,
      });
    }
  },
},




    methods: {
      selectFiles(){
        this.$refs.fileInput.click()
      },
      onFileSelect(event){
   
        const files = event.target.files;
        console.log(files)
        if(files.length === 0){
          return;
        }
        for(let i=0; i< files.length ; i++){
          this.images.push({name :files[i].name,url: URL.createObjectURL(files[i])} );
      }
    },
    onBackgroundSelect(event) {
      const file = event.target.files[0]; // Corrected line
      this.background = URL.createObjectURL(file);
    },
    deleteImage(index){
      this.images.splice(index,1);
    },
    realSliderWidth() {
      return this.slideCount * this.sliderWidth + ((this.slideCount - 1) * this.spaceBetweenSlides);
    },
    realSliderHeight() {
      return this.sliderHeight;
    },
    getSwiperNavigation() {
      console.log(this.modulesOptions[this.modules])
    if (this.buttonVar) {
      return {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }
    return false; // Return undefined when navigation is not enabled
 },

 realSliderWidthAll(){

  
    return this.slideCount * this.sliderWidth + ((this.slideCount - 1) * this.spaceBetweenSlides) + this.offset*2;

 },


     exportCode(){
    // Dynamically generate the SwiperSlide elements
    let swiperSlidesHtml = '';
    this.images.forEach((image, index) => {
      swiperSlidesHtml += `
      <div class="swiper-slide" id="card${index}">
          <gwd-image src="assets/${image}" />
        </div>
      `;
    });

    // Construct the Swiper component HTML
    const swiperScript = `
    SCRIPT CODE!!!!!!!!!
    var swiper = new Swiper(".mySwiper", {
      autoplay: ${this.autoplay},
      ${this.autoplay ?  'autoplay:' + `{ delay: ${this.autoplayDelay} },` : ''}
      slidesPerView: ${this.slideCount},
      spaceBetween: ${this.spaceBetweenSlides},
      loop: ${this.loopVar},
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      modules: [${this.modulesOptions[modules].map(m => `'${m}'`).join(',')}]
        :navigation="${getSwiperNavigation()}"
        :loop=${this.loopVar}

    });
    `;

    // Define the code you want to export
    const htmlCode = `
    HTML CODE!!!!!!!!!
    <div class="swiper mySwiper">
      <div class="swiper-wrapper" id="cards">
        ${swiperSlidesHtml}
      </div>
      <div class="swiper-button-next" id="arrow-right"></div>
      <div class="swiper-button-prev" id="arrow-left"></div>
    </div>
    `;
console.log(htmlCode);
console.log(swiperScript);
console.log('<link rel="stylesheet" href="swiper-bundle.min.css">')
    // The rest of your exportCode method...

  },

  },
 

  components: {
     Swiper,
     SwiperSlide,
 

  }
 
});
</script>
 
<template>
  <div style="display:flex; flex-direction:column; max-width: 1280px;  margin: auto;">
    <div class="content-box" :style="background ? { backgroundImage: 'url(' + background + ')', backgroundSize: 'cover' } : {}">

      <div class="first" :style="{ width: realSliderWidthAll() + 'px', height: realSliderHeight() + 'px', top: positionTop+'px',  left: positionLeft+'px'} ">
        <Swiper
        class="swiper"
        :modules=modulesOptions[modules]
        :navigation="getSwiperNavigation()"
        effect="cube"
        :loop=loopVar
        :slidesPerView=slideCount
        :spaceBetween=spaceBetweenSlides
        :style="{ width: realSliderWidth() + 'px', height: realSliderHeight() + 'px'} "
 
        >
      
          <SwiperSlide v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="" />
          </SwiperSlide>
        </Swiper>
      
        <div v-if="getSwiperNavigation() != false" class="swiper-button-prev"></div>
        <div v-if="getSwiperNavigation() != false" class="swiper-button-next"></div>
 
      </div>

    </div>
     
     <div class="second">
      <div class="settings">
        <label>
          <input type="text" v-model="sliderHeight" /> slide heigth
        </label>
        <label>
          <input type="text" v-model="sliderWidth" /> slider width
        </label>
        <label>
          <input type="checkbox" v-model="loopVar"> Enable Loop
        </label>
        <label>
          <input type="text" v-model="slideCount" /> Slider per view
        </label>
        <label>
          <input type="text" v-model="spaceBetweenSlides" /> Space between slides
        </label>
        <label>
          <input type="text" v-model="offset" /> Button offset
        </label>
        <label>
          <input type="checkbox" v-model="buttonVar"> Side buttons
        </label>
        <label>
          <input type="text" v-model="positionTop" /> Y position
        </label>
        <label>
          <input type="text" v-model="positionLeft" /> X position
        </label>
        <div class="drag-area">
          <span class="select" role="button" @click="selectFiles">
          </span>select background image
          <input name="file" type="file" class="file" ref="fileInput" @change="onBackgroundSelect"/>
        </div>
        <label>
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
        <!-- <label>
          <input type="text" v-model="defineSwiper"> Side button x
        </label> -->


       
         <button @click="exportCode">Export Code</button>
      </div>
     
       <div class="card">
          <div class="drag-area">
            
            <span class="select" role="button" @click="selectFiles">
            </span>
            <input name="file" type="file" class="file" ref="fileInput" multiple @change="onFileSelect"/>
          </div>
          <div class="container">
            <div class="image" v-for="(image, index) in images" :key="index">
              <span class="delete" @click="deleteImage(index)">&times;</span>
              <img :src="image.url"/>
            </div>
          </div>
       </div>
  </div>
</div>
 </template>
 

 <style scoped>

.first{
  position: relative;
}

 
 .swiper-button-next {
     right: 10px;
 }
 
 .swiper-button-prev {
     left: 10px;
 }


 .swiper{
  margin-top: auto;
 }
 .card{
  width: 100%;
  padding: 10px;
 
 }
 .card .top{
  text-align: center;
 }
 .card p{
  font-weight: bold;
  color: brown;
 }
 .card button{
  outline: 0;

 }
 .card .drag-area{
  height: 150px;
  border-radius: 5px;
  border: 2px dashed  #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  margin-top: 10px;
 }

 .card .select{
  color: aqua;
  margin-left: 5px;
 }

 .card .container{
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 200px;
  position: relative;

 }
.card .container .image img{
  width: 100px;
 
  border-radius: 5px;
}
 

 .container {
  width: 100%;
  display: flex;
  flex-direction: row;
 }
 
 .content-box {
  width: 1280px;
  height: 720px;
  background-color: #dedede;

 }
 

 
 .swiper-slide img {
  width: 100%;
  height: 100%;
 }






.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #050101;
  width: 20%;
}

.settings{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap
}


 </style>