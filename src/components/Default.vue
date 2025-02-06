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

  <v-row class="">
    <v-col class="second" cols="4">
      <Images @imagesUpdated="updateImages" />

      <div class="settings">
        <v-text-field
          label="Slider width"
          v-model="sliderWidth"
          type="number"  
          :max="100"
          @input="validateInput"
        ></v-text-field>
        <v-switch
          v-model="loopVar"
          color="#00e18c"
          label="Enable Loop"
          hide-details
        ></v-switch>
        <v-switch
          v-if="this.type == 'cube'"
          v-model="cubeShaddow"
          color="#00e18c"
          label="Enable Shaddow"
          hide-details
        ></v-switch>

        <div v-if="this.type == 'multiple'">
          <v-text-field
            label="Slides Per View"
            v-model="slideCount"
            outlined
          ></v-text-field>
          <v-text-field
            label="Space Between Slides"
            v-model="spaceBetweenSlides"
            outlined
          ></v-text-field>
        </div>

        <v-switch
          v-model="autoplayVar"
          color="#00e18c"
          label="Enable autoplay"
          hide-details
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
          type="number"
          outlined
        ></v-text-field>
        <v-switch
          v-model="buttonVar"
          color="#00e18c"
          label="Side buttons"
          hide-details
        ></v-switch>

        <div v-if="buttonVar">
          <v-select
            v-model="btnType"
            :items="['image', 'default']"
            label="Button Type"
            item-text="text"
            item-value="value"
            return-object
            outlined
          ></v-select>

          <div v-if="btnType == 'default'">
            <v-color-picker v-model="btnColor"></v-color-picker>
          </div>

          <div v-else>
            <v-file-input
              clearable
              @change="importBtnImage"
              prepend-icon=""
              label="Button image"
            ></v-file-input>
          </div>

          <v-text-field
            label="Button offset x"
            v-model="offset"
            type="number"
            outlined
          ></v-text-field>
          <v-text-field
            label="Button width"
            v-model="btnWidth"
            type="number"
            outlined
          ></v-text-field>
        </div>
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

        <v-text-field
          label="Position Top"
          v-model="positionTop"
          type="number"
          outlined
        ></v-text-field>
        <v-text-field
          label="Position left"
          v-model="positionLeft"
          type="number"Q
          outlined
        ></v-text-field>
        <v-file-input
          @change="importBgImage"
          id="bgImageInput"
          prepend-icon="" 
          label="Background image"
          clearable 
          @click:clear="clearBgImage"
        ></v-file-input>

        <button @click="exportCode" id="activator-target">Export Code</button>
      </div>
    </v-col>
    <v-col
      class="content-box"
      :style="
        background
          ? {
              backgroundImage: 'url(' + background + ')',
              backgroundSize: 'cover',
              position: 'relative',
            }
          : { position: 'relative' }
      "
     cols="8">
      <div 
        :style="
            index == 1
              ? ''
              : { top: positionTop + 'px', left: positionLeft + 'px', width: realSliderWidth() + '%' }"
        class="first"
      >
        <Swiper
          :key="creativeType + cubeShaddow"
          :style="
            index == 1
              ? { overflow: 'visible', width: realSliderWidth() + 'px' }
              : ''
          "
          class="swiper mySwiper asd swiper-navigation-vertical"
          :modules="modules[index]"
          :effect="effects[index]"
          :navigation="getSwiperNavigation()"
          :autoplay="{ delay: autoplayDelay, disableOnInteraction: autoplayInt }"
          :loop="loopVar"
          :slidesPerView="slideCount"
          :spaceBetween="spaceBetweenSlides"
          v-bind="effectBindings()"
        >
          <SwiperSlide v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="" />
          </SwiperSlide>
        </Swiper>

        <!-- swiper default buttons -->
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
        >
          <!-- <img
            v-if="btnImg"
            :style="getSwiperNavigationImg()"
            :src="btnImg"
            alt="Next Slide"
          /> -->
        </div>  
      </div>
      <div></div>
    </v-col>
  </v-row>
</template>
 
<script>

import { Swiper, SwiperSlide } from "swiper/vue";
import {
  EffectCube,
  EffectFade,
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
      images: [],
      // params
      positionTop: 50,
      positionLeft: 50,
      slideCount: 1,
      spaceBetweenSlides: 0,
      sliderWidth: 40,
      loopVar: true,
      autoplayVar: false,
      autoplayInt: false,
      autoplayDelay: 2000,
      swiper: null,
      background: null,
      showDialog: false,

      // for buttons
      buttonVar: false,
      offset: 0,
      btnColor: "#fff",
      btnType: "default",
      btnWidth: 40,
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
      cubeShaddow: true,

      // effects&modules
      effects: ["", "cube", "fade", "creative"],
      modules: [
        [Navigation],
        [Navigation, EffectCube],
        [Navigation, EffectFade],
        [Navigation, EffectCreative],
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
      const fileInput = document.getElementById('bgImageInput'); // Get file input element
      if (fileInput) {
        fileInput.value = ''; // Clear the file input value
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
    realSliderWidth() {
      return (
        this.slideCount * this.sliderWidth +
        (this.slideCount - 1) * this.spaceBetweenSlides
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
        "font-size": this.btnWidth + "px",
      };
    },

    getSwiperNavigationLeft() {
      if (this.btnType == "image") {
        return { 
          left: this.offset * -1 + "px",
          transform: `rotate(180deg) scale(${this.btnWidth / 50})`, // Adjust scaling dynamically
          backgroundImage: `url('${this.btnImg}')`,
        };
      }
      this.btnImg = null;
      return {
        left: this.offset * -1 + "px",
        "--swiper-navigation-size": this.btnWidth + "px",
        color: this.btnColor,
        width: "auto",
      };
    },

    getSwiperNavigationRight() {
      if (this.btnType == "image") {
        return {
          transform: `scale(${this.btnWidth / 50})`, // Adjust scaling dynamically
          right: this.offset * -1 + "px",
          backgroundImage: `url('${this.btnImg}')`,
        };
      }
      this.btnImg = null;
      return {
        right: this.offset * -1 + "px",
        "--swiper-navigation-size": this.btnWidth + "px",
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
      if (!this.cubeShaddow) {
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
    calculateWrapperHeight() {
      const wrapper = document.querySelector(".swiper");
      if (wrapper) {
        const height = wrapper.offsetHeight;
        return height + "px";
      }
    },

    // big export code function
    exportCode() {
      const wrapperHeight = this.calculateWrapperHeight();
      const windowHeight = 810;
      const windowWidth = 1440;
      const top = (this.positionTop / windowHeight) * 100 + "%";
      const left = (this.positionLeft / windowWidth) * 100 + "%";
      const offset = "-" + (this.offset / windowWidth) * 100 + "%";
      //const offset = "-" + this.offset + "px";
      const btnWidth = (this.btnWidth / windowWidth) * 100 + "vw";
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
          ? ` color: ${this.btnColor}; font-size: ${btnWidth}; width: auto;`
          : `transform: scale(${this.btnWidth / 100});background-image: url('assets/${this.btnImgName}');`
      }
    }
    .swiper-button-prev{
      top: 50%;
      left: ${offset};
      font-family: Arial, sans-serif;
      ${
        this.btnType == "default"
          ? ` color: ${this.btnColor}; font-size: ${btnWidth}; width: auto;`
          : `transform: rotate(180deg) scale(${this.btnWidth / 100}); background-image: url('assets/${this.btnImgName}');`
      }
    }
    .swiper-button-next::after{
      ${
        this.btnType == "default" && this.buttonVar
          ? `--swiper-navigation-size: ${btnWidth};`
          : `content: ""`
      }
    }
    .swiper-button-prev::after{
      ${
        this.btnType == "default" && this.buttonVar
          ? `--swiper-navigation-size: ${btnWidth};`
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
    <script* src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script*>
    <script*> 
    var userSwipe = false;
    var buttonClicked = false;

    var swiper = new Swiper(".mySwiper", {
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
    spaceBetween: ${this.spaceBetweenSlides / 2},
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

.first {
  position: absolute;
  /* Keep this if you need to position children absolutely */
  margin: 0px !important;
  width: 100%;
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
  padding: 10px;
  margin: 10px;
  background-color: #0b3144;
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
  width: 1920px;
  /* height: 1080px; */
  aspect-ratio: 16/9;
  background-color: #dedede;
  flex: none;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}

.second {
  color: #f0f0f0;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #2b4d5e;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.settings {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #0b3144;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    width: 600px;
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
  gap: 2rem;
}
</style>
