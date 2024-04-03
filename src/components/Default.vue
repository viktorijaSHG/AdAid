<script>
import {Swiper, SwiperSlide} from "swiper/vue"
import { EffectCube,  EffectFade, Navigation, Pagination, Autoplay} from 'swiper/modules';

import 'swiper/css/effect-fade';

import 'swiper/css/effect-cube';
import 'swiper/css';
import 'swiper/css/navigation';

import 'swiper/css/autoplay';


export default (await import('vue')).defineComponent({
  props: {
    images: {
      type: Array
    },
    type: {
      type: String
    },
    index: {
      type: Number
    },
 },

  data(){
    return {
      swiperRef: null,
      isDragging:false,
      EffectCube,
      EffectFade,
      Autoplay,
      freemodeVar:true,
      Navigation,
      Pagination,
      loopVar:false,
      slideCount:1,
      spaceBetweenSlides: 0,
      sliderWidth: 130,
      sliderHeight: 200,
      buttonVar: false,
      buttonX: 0,
      setWrapperSize:200,
      offset:0,
      positionTop: 200,
      positionLeft: 200,
      swiper: null,
      background: null,
      directionVar: 'horizontal',
      effects:[
        "",
        'cube',
        "fade"
      ],
      modules: [
      [Navigation],
      [Navigation, EffectCube],
      [Navigation, EffectFade],
    ],
    autoplayVar:true,
    autoplayDelay:2000,
    btnWidth:40
    }
    },

  methods: {
    realSliderWidth() {
      if (this.directionVar=="horizontal"){
        // let spaceBetweenSlidesPercentage = (this.spaceBetweenSlides / 1280) * 100;
    
        // let totalWidthInPixels = this.slideCount * this.sliderWidth + ((this.slideCount - 1) * spaceBetweenSlidesPercentage);
    
        // console.log(totalWidthInPixels);
        //   return totalWidthInPixels;
 
        //console.log(this.slideCount * this.sliderWidth + ((this.slideCount - 1) * this.spaceBetweenSlides))
        return this.slideCount * this.sliderWidth + ((this.slideCount - 1) * this.spaceBetweenSlides);

      }
      else{
        return this.sliderWidth;
      }

    },
    realSliderHeight() {
      if (this.directionVar=="horizontal"){
        return this.sliderHeight;
      }
      else{
      
        return this.slideCount * this.sliderHeight + ((this.slideCount - 1) * this.spaceBetweenSlides);
      }
      
    },
    getSwiperNavigation() {
     
      
    if (this.buttonVar) {
      return {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }
    return false; // Return undefined when navigation is not enabled
 },

 getSwiperNavigationLeft(){

      if (this.directionVar == 'horizontal'){
        return {
          left: this.offset*-1 +'px',
        '--swiper-navigation-size': this.btnWidth+'px',
      
      };
      }
      else{
        return{
          
          '--swiper-navigation-size': this.btnWidth+'px',
          'transform': 'rotate(90deg)'
        }
      

      }
 },

 getSwiperNavigationRight(){

      // Return the styles as an object
      if (this.directionVar == 'horizontal'){
        return {
          right: this.offset*-1 +'px',
        '--swiper-navigation-size': this.btnWidth+'px',
      
      };
      }
      else{
        return{
        
          '--swiper-navigation-size': this.btnWidth+'px',
          'transform': 'rotate(90deg)'
        }
      

      }
 },


 realSliderWidthAll(){

    if (this.directionVar=='horizontal'){
      
      return this.slideCount * this.sliderWidth + ((this.slideCount - 1) * this.spaceBetweenSlides) + this.offset*2;
    }
    else{
      return this.sliderWidth;
    }
      

 },

 realSliderHeightAll(){
  if (this.directionVar=="horizontal"){
    console.log(this.sliderHeight)
        return this.sliderHeight;
      }
      else{
      
        console.log(this.slideCount * this.sliderHeight + ((this.slideCount - 1) * this.spaceBetweenSlides) + this.offset*2)
        return this.slideCount * this.sliderHeight + ((this.slideCount - 1) * this.spaceBetweenSlides) + this.offset*2;
      }
 },

     exportCode(){
    const windowHeigth = 720
    const windowWidth = 405
    const heigth = this.realSliderHeight()+"px";
    const width = this.realSliderWidth()+"px";
    const top = this.positionTop+"px";
    const  left = this.positionLeft+"px";

    const offset = "-"+this.offset+"px";
    const btnWidth = this.btnWidth+ "px";
   


    const styles = `
    .wrapper {
      height: ${heigth};
      width: ${width};
      position:absolute;
      top: ${top};
      left:${left};
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .swiper-slide gwd-image {
      display: block;
      object-fit: cover;
      width: 100%;
    }

    .swiper-button-next{
      right: ${offset};
      --swiper-navigation-size: ${btnWidth};
    }
    .swiper-button-prev{
      left: ${offset};
      --swiper-navigation-size: ${btnWidth};
    }
    `

    let swiperSlidesHtml = ""
    this.images.forEach((image, index) => {
      swiperSlidesHtml += `
      <div class="swiper-slide" id="card${index}">
          <gwd-image src="assets/${image.src}" />
        </div>
      `;
    });
    const modulesString = this.modules[this.index].map(module => module.name).join(', ');
    // Construct the Swiper component HTML
    const swiperScript = `
    SCRIPT CODE!!!!!!!!!
    var swiper = new Swiper(".mySwiper", {
   
      effect: "${this.effects[this.index]}",
      ${this.autoplayVar ? `autoplay: ${this.autoplayVar} `:  ''},
      ${this.autoplayVar ?  'autoplay:' + `{ delay: ${this.autoplayDelay} },` : ''}
      slidesPerView: ${this.slideCount},
      spaceBetween: ${this.spaceBetweenSlides},
      loop: ${this.loopVar},
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
     
    });
    `;

    // Define the code you want to export
    const htmlCode = `
    HTML CODE!!!!!!!!!
    <div class="wrapper">
      <div class="swiper mySwiper">
        <div class="swiper-wrapper" id="cards">
          ${swiperSlidesHtml}
        </div>
      </div>
      <div class="swiper-button-next" id="arrow-right"></div>
      <div class="swiper-button-prev" id="arrow-left"></div>
    </div>
    `;

console.log(htmlCode);
console.log(swiperScript);
console.log(styles)
console.log('<link rel="stylesheet" href="swiper-bundle.min.css">')
 const newWindows = window.open("", "_blank");
 newWindows.document.write('<html><head><title>Exported Code</title>');
 newWindows.document.write('<link rel="stylesheet" href="swiper-bundle.min.css">');
 newWindows.document.write( styles );
 newWindows.document.write( String(htmlCode) );
 newWindows.document.write( "<script src='swiper-bundle.min.js'../script><script>" );

 newWindows.document.write(swiperScript);
 newWindows.document.write("../script>");



 newWindows.document.close();

  },

  },

  components: {
     Swiper,
     SwiperSlide,
 

  },
  computed: {
 autoplayConfig() {
    if (this.autoplayVar) {
     
      return { delay: this.autoplayDelay };
    }
    return false;
 }
}
 
});
</script>
 
<template>
  <div class="flex-container" >
    <div class="content-box" :style="background ? { backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', position: 'relative'} : {position: 'relative'}">
      <div :style="{top:positionTop+'px', left:positionLeft+'px'}"  class="first">
        <Swiper
        :autoplay="autoplayConfig"
        :direction="directionVar"
       
        class="swiper swiper-navigation-vertical" 
        :modules=modules[index]
        :effect=effects[index]
        :navigation="getSwiperNavigation()"
        :loop=loopVar
        :slidesPerView=slideCount
        :spaceBetween=spaceBetweenSlides
        :style="{ width: realSliderWidth() + 'px'} "
        >
      
          <SwiperSlide  v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="" />
          </SwiperSlide>
        </Swiper>     
        <div v-if="getSwiperNavigation() != false"  class="swiper-button-prev" :style="getSwiperNavigationLeft()"></div>
        <div v-if="getSwiperNavigation() != false"  class="swiper-button-next" :style="getSwiperNavigationRight()"></div>
      </div>

      

      <div>
        
      </div>
      </div>   
    <div class="second">
 
      
      <div class="settings">
      
        <label>
          <input type="text" v-model="sliderWidth" /> slider width
        </label>
        <label>
          <input type="checkbox" v-model="loopVar"> Enable Loop
        </label>

        <div v-if="this.type == 'multiple'">
          <label >
            <input type="text" v-model="slideCount" /> Slidesper view
          </label>
          <label  >
            <input type="text" v-model="spaceBetweenSlides" /> Space between slides
          </label>
        </div>
       
        <label>
          <input type="checkbox" v-model="autoplayVar"> Enable autoplay
        </label>

        <label v-if="autoplayVar">
          <input type="text" v-model="autoplayDelay" /> Delay(ms)
        </label>
        

        
        <label>
          <input type="checkbox" v-model="buttonVar"> Side buttons
        </label>

        <div v-if="buttonVar">
          
          <label>
            <input type="text" v-model="offset" /> Button offset x
          </label>
  
  
          <label>
            <input type="text" v-model="btnWidth" /> Button width
          </label>

        </div>
        

        <!-- <label>
          <input type="checkbox" v-model="freemodeVar"> Freemode
        </label> -->

        <label>
          <select v-model="directionVar">
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
           </select>Direction
           
        
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
 


       
         <button @click="exportCode">Export Code</button>
      </div>
     
       
 
    </div></div>
 </template>
 

 <style scoped>


 .first {
 
  
  position: absolute; /* Keep this if you need to position children absolutely */

  
  margin: 0px!important;
 }

 
 /* .swiper-button-next {
     right: 10%;
 }
 
 .swiper-button-prev {
     left: 10px;
 } */

 .swiper{
  margin: 0;
 }

 .swiper-slide{
  width: 100%;
  height: 100%;
 }
 .card{
  width: 100%;
  padding: 10px;
  margin: 10px;
 
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
  width: 720px;
  height: 405px;
  background-color: #dedede;

 }
 
 .swiper-slide img {
  width: 100%;
  height: 100%;
 }

.content-box{
  align-items: center;
  justify-content: center;
  margin: auto
}

 .second {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5; /* Light grey background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  margin-top: 20px; /* Space between the first and second container */
 }
 
 .settings {
  width: 100%;
  max-width: 600px; /* Limit the width for better readability */
  padding: 20px;
  background-color: #ffffff; /* White background for contrast */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
  margin-bottom: 20px; /* Space between settings and card section */
 }
 
 .settings label {
  display: block;
  margin-bottom: 10px;
 }
 
 .settings input[type="text"],
 .settings input[type="checkbox"] {

  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
 }
 
 .settings button {
  background-color: #007bff; /* Bootstrap primary color */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
 }
 
 .settings button:hover {
  background-color: #0056b3; /* Darker shade on hover */
 }
 
 .card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #ffffff; /* White background for contrast */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
 }
 
 .card .drag-area {
  width: 100%;
  height: 150px;
  border-radius: 5px;
  border: 2px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background-color: #f0f0f0; /* Light grey background */
 }
 
 .card .select {
  color: #007bff; /* Bootstrap primary color */
  margin-left: 5px;
  cursor: pointer;
 }
 
 .card .container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 200px;
  overflow-y: auto; /* Enable scrolling if content overflows */
 }
 
 .card .container .image {
  width: 100px;
  height: 100px;
  margin: 10px;
  position: relative;
 }
 
 .card .container .image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure images cover the area without stretching */
  border-radius: 5px;
 }
 
 .card .container .image .delete {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #ff0000; /* Red color for delete button */
  background-color: #dedede;
  font-size: 20px;
  cursor: pointer;
 }
 



 
 .first, .second {
  flex: 1 0 200px; /* This makes the items flexible and sets a minimum width */
  margin: 10px; /* Adds some margin around the items */
 }
 
 /* Media query for smaller screens */
 @media (max-width: 768px) {
  .first, .second {
     flex: 1 0 100%; /* Makes the items take up the full width on smaller screens */
  }
 }

 
 
 </style>


