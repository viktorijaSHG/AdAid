<template>
  <v-dialog v-if="showDialog" v-model="showDialog" style="width: 1200px">
    <v-card>
      <v-card-title class="code-title">Exported Code</v-card-title>
      <v-card-text class="import-flex">
        <div class="codeCopy">
          <h3>Head import</h3>
          <pre v-text="ContentHead" class="codeBlock"></pre>
          <v-btn id="copy-head-btn" class="copy-btn" @click="copyHeadCode">
            {{ BtnHead }}
          </v-btn> 
        </div>
        <div class="codeCopy">
          <h3>CSS code</h3>
          <pre v-text="ContentCss" class="codeBlock"></pre>
          <v-btn id="copy-css-btn" class="copy-btn" @click="copyCssCode">
            {{ BtnCss }}
          </v-btn> 
        </div>
        <div class="codeCopy">
          <h3>HTML code</h3>
          <pre v-text="ContentHtml" class="codeBlock"></pre>
          <v-btn id="copy-html-btn" class="copy-btn" @click="copyHtmlCode">
            {{ BtnHtml }}
          </v-btn> 
        </div>
        <div class="codeCopy">
          <h3>JavaScript code</h3>
          <pre v-text="ContentJavaScript" class="codeBlock"></pre>
          <v-btn id="copy-js-btn" class="copy-btn" @click="copyJavaScriptCode">
            {{ BtnJavaScript }}
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="showDialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row class="panel">
    <v-col class="second" cols="4">
      <div class="panel-container">
        
        <Images @imagesUpdated="updateImages" />

        <div class="settings"> 

          <v-select
            v-if="type == 'scrollable'"
            v-model="SlideDirection"
            :items="direction"
            label="Slide direction"
            outlined
          ></v-select>
          <v-slider
            v-model="sliderWidth" 
            :step="1" 
            color="#00e18c"
            class="align-center"
            hide-details
          >
            <template v-slot:prepend>
              <v-text-field
              
                label="Slider width"
                v-model="sliderWidth"
                type="text"  
                append-inner-icon="mdi-percent-outline" 
                style="width: 170px"
                @input="validateInput" 
                hide-details
                 
              ></v-text-field>
            </template>
          </v-slider>
          
          <v-slider
            v-if="type == 'scrollable'"
            v-model="sliderHeight" 
            :step="1" 
            color="#00e18c"
            class="align-center"
            hide-details
          >
            <template v-slot:prepend>
              <v-text-field
                v-if="type == 'scrollable'"
                label="Slider Height"
                v-model="sliderHeight"
                type="text"  
                append-inner-icon="mdi-percent-outline" 
                style="width: 170px"
                @input="validateInput" 
                hide-details
                 
              ></v-text-field>
            </template>
          </v-slider>
          <v-slider
            v-model="positionTop" 
            :step="1" 
            color="#00e18c"
            class="align-center" 
            hide-details
          >
            <template v-slot:prepend>
              <v-text-field
                label="Position Top"
                v-model="positionTop"
                append-inner-icon="mdi-percent-outline"
                type="text"
                style="width: 170px"
                outlined 
                hide-details
              ></v-text-field>
            </template>
          </v-slider>

          
          <v-slider
            v-model="positionLeft" 
            :step="1" 
            color="#00e18c"
            class="align-center"  
            hide-details
          >
            <template v-slot:prepend>
              <v-text-field
                label="Position left"
                v-model="positionLeft"
                append-inner-icon="mdi-percent-outline"
                type="text"
                style="width: 170px"
                outlined 
                hide-details
              ></v-text-field>
            </template>
          </v-slider> 

          <!-- changed the names from numbers to titles -->
          <div v-if="effects[index] == 'creative'">
            <v-select
              v-model="creativeType"
              :items="[
                { text: 'Zoomout Slider', value: 1 },
                { text: 'Zoomout Carousel', value: 2 },
                { text: 'Slider', value: 3 },
                { text: 'Flip', value: 4 },
                { text: 'Roll', value: 5 },
                { text: 'Flipbook', value: 6 },
              ]"
              label="Slide type"
              item-text="text"
              item-title="text"
              item-value="value"
              outlined
            ></v-select>
          </div>

          <div v-if="this.type == 'multiple'">
            <v-text-field
              label="Slides Per View"
              v-model="slideCount"
              outlined
            ></v-text-field>

            
            <v-slider
              v-model="spaceBetweenSlides" 
              :step="1" 
              color="#00e18c"
              class="align-center"
              hide-details
            >
              <template v-slot:prepend>
                <v-text-field
                  label="Space Between Slides"
                  v-model="spaceBetweenSlides"
                  style="width: 200px" 
                  outlined
                ></v-text-field>
              </template>
            </v-slider>
             
            
          </div>

          <v-switch
            v-model="loopVar"
            color="#00e18c"
            label="Enable Loop"
            hide-details
          ></v-switch>
          <v-switch
            v-if="this.type == 'cube'"
            v-model="cubeShadow"
            color="#00e18c"
            label="Enable Shadow"
            hide-details
          ></v-switch>
          <v-switch
            v-model="autoplayVar"
            color="#00e18c"
            label="Enable autoplay"
            hide-details
            v-if="type !== 'scrollable'"
          ></v-switch>
          <v-switch
            v-model="autoplayInt"
            v-if="autoplayVar"
            color="#00e18c"
            label="Disable Autoplay On Interaction"
            hide-details
          ></v-switch>
          <v-text-field
            v-if="autoplayVar"
            label="Delay(ms)"
            v-model="autoplayDelay"
            type="text"
            outlined
          ></v-text-field>
          <v-switch
            v-if="type !== 'scrollable'"
            v-model="buttonVar"
            color="#00e18c"
            label="Side buttons"
            hide-details
          ></v-switch>

          <div v-if="buttonVar">
            <v-select
              v-model="btnType"
              :items="['default', 'image']"
              label="Button Type"
              item-text="text"
              item-value="value"
              return-object
              outlined
            ></v-select>

            <div v-if="btnType == 'default'">
              <v-color-picker v-model="btnColor" :swatches="swatches" swatches-max-height="100px" mode="hexa" show-swatches class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </div>

            <div v-else>
              <v-file-input
                clearable
                @change="importBtnImage"
                prepend-icon=""
                label="Button image"
              ></v-file-input>
            </div> 
          <v-slider
            v-model="offset"
            :max="maxOffset"
            :min="minOffset"
            :step="1" 
            color="#00e18c"
            class="align-center" 
            hide-details
          >
            <template v-slot:prepend>
              <v-text-field
                label="Arrow side offset"
                v-model="offset"
                type="text"
                :max="maxOffset"
                :min="minOffset"
                outlined
                append-inner-icon="mdi-percent-outline" 
                style="width: 170px" 
                hide-details
              ></v-text-field>
            </template>
          </v-slider>
            
          <v-slider
            v-model="btnWidth" 
            :step="1" 
            color="#00e18c"
            class="align-center" 
            hide-details
          >
            <template v-slot:prepend>
              <v-text-field
                label="Arrow size"
                v-model="btnWidth"
                type="text"
                append-inner-icon="mdi-percent-outline"
                outlined
                @input="validateInput" 
                style="width: 170px" 
                hide-details
              ></v-text-field>
            </template>
          </v-slider>
          </div>
          
          
          <v-file-input
            @change="importBgImage"
            v-model="bgImageInput"
            prepend-icon="" 
            :clearable="false"
            append-icon="mdi-delete-empty-outline"
            label="Background image" 
            @click:append="clearBgImage" 
          >
        </v-file-input>

          <button @click="exportCode" id="activator-target">Export Code</button>
        </div>
      </div>
    </v-col>
    <v-col class="artboard" cols="8">
      <div class="content-box"
      :style="
        background
          ? {
              backgroundImage: 'url(' + background + ')',
              backgroundSize: 'contain',
              position: 'relative',
            }
          : { position: 'relative' }
      ">
        
        <div 
          :style="
              index == 1
                ? { top: positionTop + '%', left: positionLeft + '%', width: realSliderWidth() + '%' }
                : { top: positionTop + '%', left: positionLeft + '%', width: realSliderWidth() + '%' }"
          class="first"
        >
          <div v-if="images && images.length">
            <Swiper
              v-if="type === 'multiple' || type === 'cube' || type === 'creative' || type === 'single'"
              :key="creativeType + cubeShadow"
              :style="
                index == 1
                  ? { overflow: 'visible' }
                  : ''
              "
              class="swiper mySwiper testcallout swiper-navigation-vertical"
              :modules="modules[index]"
              :effect="effects[index]"
              :navigation="getSwiperNavigation()"
              :autoplay="{ delay: autoplayDelay, disableOnInteraction: autoplayInt }"
              :loop="loopVar"
              :slidesPerView="type === 'scrollable' ? 'auto' : slideCount"
              :spaceBetween="spaceBetweenSlides"
              :mousewheel="type === 'scrollable'"
              :free-mode="type === 'scrollable'"
              :direction="type === 'scrollable' ? 'horizontal' : undefined"
              :observe="true"
              :observe-parents="true"
              :breakpoints="{
                200: {
                  spaceBetween: spaceBetweenSlides / 3
                },
                400: {
                  spaceBetween: spaceBetweenSlides / 3
                },
                640: {
                  spaceBetween: spaceBetweenSlides
                },
                1024: {
                  spaceBetween: spaceBetweenSlides
                }
              }"
              v-bind="effectBindings()"   
            >
              <SwiperSlide v-for="(image, index) in images" :key="index">
                <img :src="image.url" alt="" />
              </SwiperSlide>
            </Swiper> 
              <div
                  v-if="getSwiperNavigation() != false"
                  class="swiper-button-prev"
                  :style="getSwiperNavigationLeft()"
                  v-bind:class="{ 'swiper-custom-prev': btnType == 'image' }"
                >
                  <!-- <img
                    v-if="btnImg"
                    :style="getSwiperNavigationImg()"
                    :src="btnImg"
                    alt="Previous Slide"
                  /> -->
                </div>
                <div
                  v-if="getSwiperNavigation() != false"
                  class="swiper-button-next"
                  :style="getSwiperNavigationRight()"
                  v-bind:class="{ 'swiper-custom-next': btnType == 'image' }"
                ></div>
          </div>
        </div>
        <!-- Scrollable Gallery -->
        <div 
          :style="
              index == 1
                ? { top: positionTop + '%', left: positionLeft + '%', height: realSliderHeight() + '%', width: realSliderWidth() + '%' }
                : { top: positionTop + '%', left: positionLeft + '%', height: realSliderHeight() + '%', width: realSliderWidth() + '%' }"
          
              :class="['scrollable', SlideDirection === 'Vertical' ? 'vertical' : 'horizontal']"
        >
          <div v-if="type === 'scrollable' && images?.length" id="scrollable">

            <div v-for="(image, index) in images" :key="index" :id="'Card' + (index + 1)" class="scrollcard">
              <gwd-taparea :id="'Card' + (index + 1) + 'TapArea'"></gwd-taparea>
              <!-- <img :id="'Card' + (index + 1) + 'HoverImage'" :src="image.url" alt="" /> -->
              <img :id="'Card' + (index + 1) + 'BaseImage'" :src="image.url" alt="" />
            </div>
            ....
          </div>
          </div> 
        </div> 
      <div></div>
    </v-col>
  </v-row>
</template>
 
<script>

import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay,
  EffectCube,
  EffectFade,
  FreeMode,
  Mousewheel,
  Navigation,
  EffectCreative,
} from "swiper/modules";
import Images from "./Images.vue";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";
import "@mdi/font/css/materialdesignicons.css";

export default {
  props: {
    type: {
      type: String,
    },
    index: {
      type: Number,
    },
  },

  data() {
    return {
      
      direction: ['Vertical', 'Horizontal'],
      SlideDirection: 'Vertical',
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],
      images: [],
      // params
      positionTop: 4,
      positionLeft: 2,
      slideCount: 1,
      spaceBetweenSlides: 0, 
      sliderWidth: 40,
      sliderHeight: 40,
      loopVar: false,
      autoplayVar: false,
      autoplayInt: false,
      autoplayDelay: 2000,
      swiper: null,
      background: null,
      showDialog: false,
      bgImageInput: null,

      // for buttons
      buttonVar: false,
      offset: 4,
      minOffset: -15,   // Set to the desired negative limit
      maxOffset: 30,    // Set to the desired positive limit
      btnColor: "#fff",
      btnType: "default",
      btnWidth: 25,
      btnImg: null,

      // for pop-up dialog
      btnImgName: "",
      ContentJavaScript: "",
      ContentHtml: "",
      ContentCss: "",
      ContentHead: "",
      BtnHtml: "Copy HTML",
      BtnJavaScript: "Copy JavaScript",
      BtnCss: "Copy Css",
      BtnHead: "Copy head code",

      // for effect specifics
      creativeType: 3,
      cubeShadow: false,

      // effects&modules
      effects: ["", "cube", "fade", "creative",""],
      modules: [
        [Navigation],
        [Navigation, EffectCube],
        [Navigation, EffectFade],
        [Navigation, EffectCreative],
        [Autoplay],
        [FreeMode],
        [Mousewheel],
      ],

      sliderWidth: "40", // Empty string to prevent issues with number type
    };
  },

  methods: { 
    validateInput() {
      let num = Number(this.sliderWidth);

      // If input is not a number or out of bounds, correct it
      if (isNaN(num) || num < 0) {
        num = 0;
      } else if (num > 100) {
        num = 100;
      }

      // Assign back the corrected value
      this.sliderWidth = num.toString();
    },
    // slider images
    updateImages(newImages) {
      this.images = newImages;
    },

    // functions for coping code from dialog box (they will become one later)
    trim(text) {
      return text.substring(5, text.length - 6);
    },

    copyCssCode() {
      navigator.clipboard
        .writeText(this.trim(this.ContentCss))
        .then(() => {
          var button = document.getElementById("copy-css-btn");
          button.textContent = "Copied to clipboard ✔";
          // Use setTimeout to revert the button text after 3 seconds
          setTimeout(function () {
            button.textContent = "Copy Css";
          }, 2000); // 2000 milliseconds = 3 seconds
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    },

    copyJavaScriptCode() {
      navigator.clipboard
        .writeText(this.trim(this.ContentJavaScript).replace(/\*/g, ""))
        .then(() => {
          var button = document.getElementById("copy-js-btn");
          button.textContent = "Copied to clipboard ✔";
          // Use setTimeout to revert the button text after 3 seconds
          setTimeout(function () {
            button.textContent = "Copy javascript";
          }, 2000); // 2000 milliseconds = 3 seconds
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    },

    copyHtmlCode() {
      navigator.clipboard
        .writeText(this.trim(this.ContentHtml))
        .then(() => {
          var button = document.getElementById("copy-html-btn");
          button.textContent = "Copied to clipboard ✔";

          // Use setTimeout to revert the button text after 3 seconds
          setTimeout(function () {
            button.textContent = "Copy HTML";
          }, 2000); // 2000 milliseconds = 3 seconds
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    },

    copyHeadCode() {
      navigator.clipboard
        .writeText(this.trim(this.ContentHead))
        .then(() => {
          var button = document.getElementById("copy-head-btn");
          button.textContent = "Copied to clipboard ✔";
          // Use setTimeout to revert the button text after 3 seconds
          setTimeout(function () {
            button.textContent = "Copy Head code";
          }, 2000); // 2000 milliseconds = 3 seconds
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    },

    // background image save function
    importBgImage(event) {
      const file = event.target.files[0]; // Get the first file from the input
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.background = e.target.result; // Update the component's state with the file's data URL
        };
        reader.readAsDataURL(file);
      }
    },

    // clear backround image function
    clearBgImage() {
      this.background = ''; // Reset background to empty string
      
      if (fileInput) { 
        this.bgImageInput = null
      }
    }, 


    // Button image save function
    importBtnImage(event) {
      const file = event.target.files[0]; // Get the first file from the input
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.btnImg = e.target.result; // Update the component's state with the file's data URL
          this.btnImgName = file.name;
        };
        reader.readAsDataURL(file); // Start reading the file
      }
    },

    // calculate width
    // realSliderWidth() {
    //   return (
    //     this.slideCount * this.sliderWidth +
    //     (this.slideCount - 1) * this.spaceBetweenSlides
    //   );
    // },
    realSliderWidth() {
      return (
        this.sliderWidth 
      );
    },
    realSliderHeight() {
      return (
        this.sliderHeight
      );
    },


    getSwiperNavigation() {
      if (this.buttonVar) {
        return {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        };
      }
      return false;
    },

    //get navigation styling
    getSwiperNavigationImg() {
      return {
        "font-size": this.btnWidth / 10 + "px",
      };
    },

    getSwiperNavigationLeft() {
      if (this.btnType == "image") {
        return { 
          left: this.offset + "%", 
          transform: `rotate(180deg) scale(${this.btnWidth / 45})`, 
          backgroundImage: `url('${this.btnImg}')`, 
          width: this.btnWidth / 40 + 'vw',
        };
      }
      this.btnImg = null;
      return {
        left: this.offset + "%",
        // left: this.offset * 1 + "%",
        "--swiper-navigation-size": this.btnWidth / 10 + "vw",
        color: this.btnColor,
        width: "auto",
      };
    },

    getSwiperNavigationRight() {
      if (this.btnType == "image") {
        return {
          transform: `scale(${this.btnWidth / 45})`, // Adjust scaling dynamically 
          right: this.offset + "%", 
          backgroundImage: `url('${this.btnImg}')`,
          width: this.btnWidth / 40 + 'vw',
        };
      }
      this.btnImg = null;
      return {
        right: this.offset + "%",
        // right: this.offset * -1 + "%",
        "--swiper-navigation-size": this.btnWidth / 10 + "vw",
        color: this.btnColor,
        width: "auto",
      };
    },

    getCreativeParams() {
      switch (this.creativeType) {
        case 1:
          return {
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          };

        case 2:
          return {
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          };

        case 3:
          return {
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          };
        case 4:
          return {
            prev: {
              shadow: true,
              translate: [0, 0, -800],
              rotate: [180, 0, 0],
            },
            next: {
              shadow: true,
              translate: [0, 0, -800],
              rotate: [-180, 0, 0],
            },
          };

        case 5:
          return {
            prev: {
              shadow: true,
              translate: ["-125%", 0, -800],
              rotate: [0, 0, -90],
            },
            next: {
              shadow: true,
              translate: ["125%", 0, -800],
              rotate: [0, 0, 90],
            },
          };

        case 6:
          return {
            prev: {
              shadow: true,
              origin: "left center",
              translate: ["-5%", 0, -200],
              rotate: [0, 100, 0],
            },
            next: {
              origin: "right center",
              translate: ["5%", 0, -200],
              rotate: [0, -100, 0],
            },
          };
      }
    },

    getCubeParams() {
      if (!this.cubeShadow) {
        return {
          shadow: false,
          slideShadows: false,
        };
      } else {
        return {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        };
      }
    },

    effectBindings() {
      if (this.effects[this.index] == "creative") {
        return {
          creativeEffect: this.getCreativeParams(),
        };
      }
      if (this.effects[this.index] == "cube") {
        return {
          cubeEffect: this.getCubeParams(),
        };
      }
      return null;
    },

    //calculate wrapper height from auto to px for export to gwd
    // calculateWrapperHeight() {
    //   const wrapper = document.querySelector(".swiper");
    //   if (wrapper) {
    //     // const height = wrapper.offsetHeight; 
    //     const height = 100; 
    //     return height + "%";
    //   }
    // },
    calculateWrapperHeight() {
      const wrapper = document.querySelector(".swiper");
      const parent = document.querySelector(".first");
      if (wrapper && wrapper.parentElement) {
        const wrapperHeight = wrapper.offsetHeight;
        const parentHeight = parent.parentElement.offsetHeight;

        if (parentHeight === 0) return "0%"; // Avoid division by zero

        const heightPercentage = (wrapperHeight / parentHeight) * 100;
        return heightPercentage.toFixed(0) + "%"; // Return as a formatted percentage
      }
      return "N/A";  
    },

    

    // big export code function
    exportCode() {
      const wrapperHeight = this.calculateWrapperHeight();
      const windowHeight = 1080;
      const windowWidth = 1920;
      const top = this.positionTop + "%";
      const left = this.positionLeft + "%";
      // const top = (this.positionTop / windowHeight) * 100 + "%";
      // const left = (this.positionLeft / windowWidth) * 100 + "%";
      // const offset = "-" + (this.offset / windowWidth) * 100 + "%";
      const offset = this.offset + "%";
      //const offset = "-" + this.offset + "px";
      // const btnWidth = (this.btnWidth / windowWidth) * 100 + "px";
      const btnWidth = this.btnWidth + "vw";
      const styles = `
    html, body {
      text-rendering: auto !important;
    }
    .swiper {
      line-height: 0;
    }
    .wrapper {
      height: ${wrapperHeight};
      width: ${this.realSliderWidth()}%;
      position:absolute;
      top: ${top};
      left:${left};
    }
    .swiper-custom-next, .swiper-custom-prev {
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center center;
    }
    .swiper-slide gwd-image {
      display: block;
      object-fit: cover;
    }
    ${
      this.buttonVar
        ? `
    .swiper-button-next{
      top: 50%;
      right: ${offset};
      font-family: Arial, sans-serif;
      ${
        this.btnType == "default"
          ? ` color: ${this.btnColor}; --swiper-navigation-size: ${ this.btnWidth / 10}vw; width: auto;`
          : `transform: scale(${this.btnWidth / 45}); background-image: url('assets/${this.btnImgName}'); width: ${this.btnWidth / 40}vw;`
      }
    }
    .swiper-button-prev{
      top: 50%;
      left: ${offset};
      font-family: Arial, sans-serif;
      ${
        this.btnType == "default"
          ? ` color: ${this.btnColor}; --swiper-navigation-size: ${ this.btnWidth / 10}vw; width: auto;`
          : `transform: rotate(180deg) scale(${this.btnWidth / 45}); background-image: url('assets/${this.btnImgName}'); width: ${this.btnWidth / 40}vw;` 
      }
    }
    .swiper-button-next::after{
      ${
        this.btnType == "default" && this.buttonVar
          ? `--swiper-navigation-size: ${ this.btnWidth / 10}vw;`
          : `content: ""`
      }
    }
    .swiper-button-prev::after{
      ${
        this.btnType == "default" && this.buttonVar
          ? `--swiper-navigation-size: ${ this.btnWidth / 10}vw;`
          : `content: ""`
      }
    } 
       
    `
        : ``
    }
    .slide-content {
      position: absolute;
      width: 100%;
      top: 0px;
      left: 0px;
      height: 100%;
      transform-style: preserve-3d;
    }
    .max-height{
      height: 100%;
    }
    `;
      let swiperSlidesHtml = "";
      this.images.forEach((image, index) => {
        swiperSlidesHtml += `
      <div class="swiper-slide max-height" id="card${index + 1}">
        <div class="max-height" id="slide-wrapper">
          <gwd-image class="slide-content" id="image_${
            index + 1
          }" src="assets/${image.name}"></gwd-image>
          <gwd-taparea class="slide-content" id="taparea_${
            index + 1
          }"></gwd-taparea>
        </div>
      </div>
      `;
      });
      // Construct the Swiper component HTML
      const swiperScript = `
    <script* src="https://cdn.jsdelivr.net/npm/swiper@10.3.1/swiper-bundle.min.js"></script*>
    <script*> 
    var userSwipe = false;
    var buttonClicked = false;

    var swiper = new Swiper(".mySwiper", {
     ${ 
      this.type == "scrollable"
        ? `direction: "horizontal",
           slidesPerView: "auto",
           freeMode: true,
           mousewheel: true,`
        : ""
    } 
    effect: "${this.effects[this.index]}",
    ${
      this.effects[this.index] == "creative"
        ? "creativeEffect:" + JSON.stringify(this.getCreativeParams()) + ","
        : ""
    }
    ${
      this.effects[this.index] == "cube"
        ? "cubeEffect:" + JSON.stringify(this.getCubeParams()) + ","
        : ""
    }
    ${
      this.autoplayVar
        ? "autoplay:" +
          `{ delay: ${this.autoplayDelay},
      disableOnInteraction: ${this.autoplayInt},
    },`
        : ""
    }
    observer: true,
    observeParents: true,
    slidesPerView: ${this.slideCount}, 
    breakpoints: {
      200: {
        spaceBetween: ${Math.floor(this.spaceBetweenSlides / 3)},
      },
      400: {
        spaceBetween: ${Math.floor(this.spaceBetweenSlides / 3)},
      },
      640: {
        spaceBetween: ${this.spaceBetweenSlides},
      }, 
      1024: {
        spaceBetween: ${this.spaceBetweenSlides},
      },
    },
    loop: ${this.loopVar},

    
    ${
      this.buttonVar
        ? `navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },`
        : ""
    }

    on: {
        touchStart: function () { 
          userSwipe = true;
        },
        slideChange: function () {
          setTimeout(() => {
            if (userSwipe && !buttonClicked) { 
              messageGateway().message({
                intent: 'adInteraction',
                type: 'Click/Swipe',
                name: 'User Gallery Swipe'
              });
            }
            userSwipe = false;
            buttonClicked = false;
          }, 50);
        },
        ${
          this.buttonVar
            ? `init: function () {
          document.querySelector('.swiper-button-next').addEventListener('click', function () {
            buttonClicked = true;  // Set flag for button click 
            messageGateway().message({
              intent: 'adInteraction',
              type: 'Click/Swipe',
              name: 'User Gallery Swipe'
            });
          });
          document.querySelector('.swiper-button-prev').addEventListener('click', function () {
            buttonClicked = true; 
            messageGateway().message({
              intent: 'adInteraction',
              type: 'Click/Swipe',
              name: 'User Gallery Swipe'
            });
          });
        }`
            : ""
        }
      }
    });
  </script*>
    `;
      // Define the code you want to export
      const htmlCode = `
      <div class="wrapper" id="gallery">
        <div class="swiper mySwiper max-height">
          <div class="swiper-wrapper max-height" id="cards">
            ${swiperSlidesHtml}
          </div>
        </div>
        ${
            this.buttonVar
              ? ` 
                ${ this.btnType === "image" ? `<div class="swiper-button-next swiper-custom-next" id="arrow-right"></div>` 
                  : `<div class="swiper-button-next" id="arrow-right"></div>`
                  }
                 ${ this.btnType === "image" ? `<div class="swiper-button-prev swiper-custom-prev" id="arrow-left"></div>` 
                  : `<div class="swiper-button-prev" id="arrow-left"></div>`
                  }
              ` 
              : ""
          }
      </div>
    `;
      this.ContentHead = `<pre><link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    /></pre>`;
      this.ContentHtml = `<pre>${htmlCode}</pre>`;
      this.ContentCss = `<pre>${styles}</pre>`;
      this.ContentJavaScript = `<pre>${swiperScript}</pre>`;
      this.showDialog = true;
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    Images,
  },
};
 
</script>

<style scoped>
.v-dialog > .v-overlay__content > .v-card > .v-card-text,
.v-dialog > .v-overlay__content > form > .v-card > .v-card-text {
  color: #0b3144 !important;
}
.color-picker {
  margin-bottom: 2rem;
}
.artboard {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 4rem 2rem 3rem;
  background-color: #223a46;
}
.panel {
  height: 100vh;
}
.panel-container { 
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  position: relative;
  padding: 0rem 1rem;
  width: 100%;

  
}
/* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #FFFFFF #DADADA;
}*/

/* Chrome, Edge and Safari */
.panel-container::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}
.panel-container::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: #0b3144;
}

.panel-container::-webkit-scrollbar-track:hover {
  background-color: #0b3144;
}

.panel-container::-webkit-scrollbar-track:active {
  background-color: #0b3144;
}

.panel-container::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background-color: #00e18c;
}

.panel-container::-webkit-scrollbar-thumb:hover {
  background-color: #00e18c;
}

.panel-container::-webkit-scrollbar-thumb:active {
  background-color: #00e18c;
}

.first {
  position: absolute;
  /* Keep this if you need to position children absolutely */
  margin: 0px !important;
  width: 100%;
}
.scrollable {
  position: absolute;
}
.vertical #scrollable{ 
  overflow: hidden auto;
}
.horizontal #scrollable{ 
  display: flex;
  overflow: auto hidden;
  scroll-snap-type: x mandatory;
  /* gap: 16px; */ 
  white-space: nowrap;
  scrollbar-width: thin; /* Firefox */
} 
#scrollable::-webkit-scrollbar {
  width: 3px;   /* vertical scrollbar thickness */
  height: 3px;  /* horizontal scrollbar thickness */
}

#scrollable::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

#scrollable::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.7);
}

#scrollable::-webkit-scrollbar-thumb:hover {
  background: rgb(85, 85, 85);
}


.scrollable #scrollable, #scrollable img {
  height: 100%; 
  width: 100%;
}
.scrollcard {
  position: relative; 
  /* horizontal */ 
  flex: 0 0 auto;
  scroll-snap-align: start;
}
gwd-taparea {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.swiper {
  margin: 0;
  line-height: 0;
}

.swiper-slide {
  width: 100%;
  height: 100%;
}

.card {
  width: 100%; 
  padding: 0rem;
  margin: 0rem;
  /* background-color: #0b3144; */
}

.card .top {
  text-align: center;
}

.card button {
  outline: 0;
}

.card .select {
  color: aqua;
  margin-left: 5px;
}

.card .container {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 200px;
  position: relative;
}

.card .container .image img {
  width: 100px;
  border-radius: 5px;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.content-box {
  /* width: 1440px;
  height: 810px; */
  width: 100%;
  /* height: 1080px; */
  aspect-ratio: 16/9;
  background-color: #ffffff;
  flex: none;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}

.second {
  padding: 0rem;
  color: #f0f0f0;
  /* max-width: 600px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 20px; */
  /* background-color: #2b4d5e;  */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  overflow: hidden;
  height: 100%; 
} 
.settings {
  width: 100%;
  /* max-width: 600px; */
  padding: 2rem 1rem;
  /* background-color: #0b3144; */
  /* border-radius: 10px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  margin-bottom: 20px;
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
  top: 0%;
  right: 1.5%;
  position: fixed;
  background-color: #00e18c;
  /* Bootstrap primary color */
  color: #2b4d5e;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.settings button:hover {
  background-color: #76ffbc;
  /* Darker shade on hover */
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
  background-color: #f0f0f0;
}

.card .select {
  color: #007bff;
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
  overflow-y: auto;
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
  object-fit: cover;
  border-radius: 5px;
}

.card .container .image .delete {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #ff0000;
  background-color: #dedede;
  font-size: 20px;
  cursor: pointer;
}

.first,
.second {
  flex: 1 0 200px;
  margin: 10px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .first,
  .second {
    flex: 1 0 100%;
    /* Makes the items take up the full width on smaller screens */
  }
}

@media (min-width: 769px) {
  .first,
  .second {
    flex: 1 0 50%;
    /* Makes the items take up half the width on larger screens */
  }
}

.flex-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.content-box {
  flex: none;
  /* width: 1440px; */
  /* Other styles */
}

.second {
  flex: 1;
  /* Other styles */
}

@media (max-width: 2000px) {
  .flex-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .second {
    margin: auto;
    /* margin-top: 30px; */
    /* width: 600px; */
  }
}

.after-class::after {
  content: none;
}

.codeBlock {
  max-height: 200px;
  overflow-y: auto;
  /* Enable scrolling if content overflows */
  margin-bottom: 50px;
  text-wrap: wrap;
  font-size: .75rem;
}

.swiper-custom-next:after, .swiper-custom-prev::after {
  content: ''
}

.swiper-custom-next, .swiper-custom-prev {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
}
.import-flex { 
  display: grid;
  grid-template-columns: auto auto;
  gap: 2rem; /* Optional spacing between items */ 
}
.codeCopy {
 background-color: #f3f3f3; 
 border-radius: .75rem;
 overflow: hidden;
 padding: 1rem 2rem 2rem 2rem;
 width: 100%;
 position: relative;
} 
.copy-btn {
  position: absolute;
  bottom: 8%;
  left: 5%;
}
.code-title {
  padding: 1rem 2rem 0rem 2rem;
}
/*.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
  content: "";
}
.swiper-button-prev:after {
  content: "";
}*/
.v-row {
  margin: 0rem;
  gap: 0rem;
}
.v-slider.v-input--horizontal {
  margin: 0rem .6rem 1.2rem 0rem;
}
</style>
