<template>

  <v-dialog v-if="showDialog" v-model="showDialog" style="width: 1200px;">
    <v-card>
      <v-card-title>Exported Code</v-card-title>
      <v-card-text>
        <h3>Head import</h3>
        <pre v-text="ContentHead" class="codeBlock"></pre>
        <v-btn id="copy-head-btn" class="copy-btn" @click="copyHeadCode">
          {{ BtnHead }}
        </v-btn>
        <br> <br> <br>
        <v-divider :thickness="7"></v-divider>
        <br> <br>
        <h3>Css code</h3>
        <pre v-text="ContentCss" class="codeBlock"></pre>
        <v-btn id="copy-css-btn" @click="copyCssCode">
          {{ BtnCss }}
        </v-btn>
        <br> <br> <br>
        <v-divider :thickness="7"></v-divider>
        <br> <br>
        <h3>HTML code</h3>
        <pre v-text="ContentHtml" class="codeBlock"></pre>
        <v-btn id="copy-html-btn" class="copy-btn" @click="copyHtmlCode">
          {{ BtnHtml }}
        </v-btn>
        <br> <br> <br>
        <v-divider :thickness="7"></v-divider>
        <br> <br>
        <h3>JavaScript code</h3>
        <pre v-text="ContentJavaScript" class="codeBlock"></pre>
        <v-btn id="copy-js-btn" @click="copyJavaScriptCode">
          {{ BtnJavaScript }}
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="showDialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="flex-container">
    <div class="content-box" :style="background ? { backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', position: 'relative' } : { position: 'relative' }">
      <div :style="{ top: positionTop + 'px', left: positionLeft + 'px' }" class="first">
        <Swiper :key="creativeType + cubeShaddow"
          :style="index == 1 ? { overflow: 'visible', width: realSliderWidth() + 'px' } : { width: realSliderWidth() + 'px' }"
          class="swiper swiper-navigation-vertical"
          :modules=modules[index] :effect="effects[index]" :navigation="getSwiperNavigation()" :loop=loopVar
          :slidesPerView=slideCount :spaceBetween=spaceBetweenSlides v-bind="effectBindings()">
          <SwiperSlide v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="" />
          </SwiperSlide>
        </Swiper>
        <div v-if="getSwiperNavigation() != false" class="swiper-button-prev" :style="getSwiperNavigationLeft()" v-bind:class="{ 'after-class': btnType == 'image' }">
          <img v-if="btnImg" :style="getSwiperNavigationImg()" :src="btnImg" alt="Previous Slide">
        </div>
        <div v-if="getSwiperNavigation() != false" class="swiper-button-next" :style="getSwiperNavigationRight()" v-bind:class="{ 'after-class': btnType == 'image' }">
          <img v-if="btnImg" :style="getSwiperNavigationImg()" :src="btnImg" alt="Next Slide">
        </div>
      </div>
      <div></div>
    </div>
    <div class="second">
      <Images @imagesUpdated="updateImages" />

      <div class="settings">

        <v-text-field label="Slider width" v-model="sliderWidth" outlined></v-text-field>
        <v-switch v-model="loopVar" color="#00e18c" label="Enable Loop" hide-details></v-switch>
        <v-switch v-if="this.type == 'cube'" v-model="cubeShaddow" color="#00e18c" label="Enable Shaddow" hide-details></v-switch>

        <div v-if="this.type == 'multiple'">
          <v-text-field label="Slides Per View" v-model="slideCount" outlined></v-text-field>
          <v-text-field label="Space Between Slides" v-model="spaceBetweenSlides" outlined></v-text-field>
        </div>

        <v-switch v-model="autoplayVar" color="#00e18c" label="Enable autoplay" hide-details></v-switch>
        <v-text-field v-if="autoplayVar" label="Delay(ms)" v-model="autoplayDelay" outlined></v-text-field>
        <v-switch v-model="buttonVar" color="#00e18c" label="Side buttons" hide-details></v-switch>

        <div v-if="buttonVar">
          <v-select v-model="btnType" :items="['image', 'default']" label="Button Type" item-text="text" item-value="value" return-object outlined></v-select>

          <div v-if="btnType == 'default'">
            <v-color-picker v-model="btnColor"></v-color-picker>
          </div>
          <div v-else>
            <v-file-input clearable @change="importBtnImage" prepend-icon="" label="Button image"></v-file-input>
          </div>

          <v-text-field label="Button offset x" v-model="offset" outlined></v-text-field>
          <v-text-field label="Button width" v-model="btnWidth" outlined></v-text-field>
        </div>

        <div v-if="effects[index] == 'creative'">
          <v-select v-model="creativeType" :items="[1, 2, 3, 4, 5, 6]" label="Slide type" item-text="text" item-value="value" return-object outlined></v-select>
        </div>

        <v-text-field label="Position Top" v-model="positionTop" outlined></v-text-field>
        <v-text-field label="Position left" v-model="positionLeft" outlined></v-text-field>
        <v-file-input clearable @change="importBgImage" prepend-icon="" label="Background image"></v-file-input>

        <button @click="exportCode" id="activator-target">Export Code</button>

      </div>

    </div>
  </div>

</template>

<script>

import {Swiper, SwiperSlide} from "swiper/vue"
import { EffectCube,  EffectFade, Navigation, EffectCreative} from 'swiper/modules';
import Images from "./Images.vue";
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/autoplay';

export default {
  props: {
    type: {
      type: String
    },
    index: {
      type: Number
    },
 },

  data(){
    return {
      images: [],  
      // params
      positionTop: 50,
      positionLeft: 50,
      slideCount:1,
      spaceBetweenSlides:0,
      sliderWidth: 150,
      loopVar:true,
      autoplayVar:false,
      autoplayDelay:2000,
      swiper: null,
      background: null,
      showDialog: false,

      // for buttons
      buttonVar: false,
      offset:0,
      btnColor: '#fff',
      btnType: 'default',
      btnWidth:40,
      btnImg: null,
    
      // for pop-up dialog
      btnImgName: '',
      ContentJavaScript:'',
      ContentHtml:'',
      ContentCss:'',
      ContentHead:'',
      BtnHtml:'Copy HTML',
      BtnJavaScript:'Copy JavaScript',
      BtnCss:'Copy Css',
      BtnHead:'Copy head code',

      // for effect specifics
      creativeType: 3,
      cubeShaddow: true,

      // effects&modules
      effects:[
          "",
          'cube',
          "fade",
          "creative"
        ],
        modules: [
        [Navigation],
        [Navigation, EffectCube],
        [Navigation, EffectFade],
        [Navigation, EffectCreative],
      ],
      }
      },

  methods: {

    // slider images
    updateImages(newImages) {
      this.images = newImages;
    },

    // functions for coping code from dialog box (they will become one later)
    trim(text){
      return text.substring(5, text.length - 6)
    },

    copyCssCode() {
      navigator.clipboard.writeText(this.trim(this.ContentCss))
      .then(() => {
        var button = document.getElementById('copy-css-btn');
        button.textContent = "Copied to clipboard ✔";
        // Use setTimeout to revert the button text after 3 seconds
        setTimeout(function() {
          button.textContent = 'Copy Css';
        }, 2000); // 2000 milliseconds = 3 seconds
              })
              .catch(err => {
                console.error('Could not copy text: ', err);
              });
      },

      copyJavaScriptCode() {
        navigator.clipboard.writeText(this.trim(this.ContentJavaScript).replace(/\*/g, ''))
          .then(() => {
            var button = document.getElementById('copy-js-btn');
            button.textContent = "Copied to clipboard ✔";
          // Use setTimeout to revert the button text after 3 seconds
          setTimeout(function() {
            button.textContent = 'Copy javascript';
          }, 2000); // 2000 milliseconds = 3 seconds
                })
                .catch(err => {
                  console.error('Could not copy text: ', err);
                });
        },

        copyHtmlCode() {
          navigator.clipboard.writeText(this.trim(this.ContentHtml))
            .then(() => {
              var button = document.getElementById('copy-html-btn');
              button.textContent = "Copied to clipboard ✔";

            // Use setTimeout to revert the button text after 3 seconds
            setTimeout(function() {
              button.textContent = 'Copy HTML';
            }, 2000); // 2000 milliseconds = 3 seconds
                  })
                  .catch(err => {
                    console.error('Could not copy text: ', err);
                  });
          },

          copyHeadCode() {
            navigator.clipboard.writeText(this.trim(this.ContentHead))
              .then(() => {
                var button = document.getElementById('copy-head-btn');
                button.textContent = "Copied to clipboard ✔";
              // Use setTimeout to revert the button text after 3 seconds
              setTimeout(function() {
                button.textContent = 'Copy Head code';
              }, 2000); // 2000 milliseconds = 3 seconds
                    })
                    .catch(err => {
                      console.error('Could not copy text: ', err);
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

      // Button image save function
      importBtnImage(event){
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
        return this.slideCount * this.sliderWidth + ((this.slideCount - 1) * this.spaceBetweenSlides);
    },

    getSwiperNavigation() {
        if (this.buttonVar) {
          return {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          };
        }
        return false; 
    },

    //get navigation styling
    getSwiperNavigationImg(){
        return {
          width: this.btnWidth+'px',
      }
    },

    getSwiperNavigationLeft(){

      if(this.btnType=='image'){
        return {
          transform: 'rotate(180deg)',
          left: this.offset*-1 +'px',
          width: this.btnWidth+'px',
        }
      }
      this.btnImg = null;
            return {
              left: this.offset*-1 +'px',
            '--swiper-navigation-size': this.btnWidth+'px',
            color:this.btnColor,
          };
    },

    getSwiperNavigationRight(){
          if(this.btnType=='image'){
            return {
              width: this.btnWidth+'px',
              right: this.offset*-1 +'px',
            }
          }
          this.btnImg = null;
                return {
                  right: this.offset*-1 +'px',
                '--swiper-navigation-size': this.btnWidth+'px',
                color:this.btnColor,
              };
        },

    getCreativeParams(){
      switch(this.creativeType) {
      case 1:
        return {
          prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
          next: {
                translate: ["100%", 0, 0],
              }
            }

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
            }

      case 3:
        return {
          prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
          next: {
                translate: ["100%", 0, 0],
              },
            }
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
          }

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
          }

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
          }
    }
    },

    getCubeParams(){
        if (!this.cubeShaddow){
          return {
              shadow: false,
              slideShadows: false,
          }
        }
        else{   
          return {
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
          }
        }
    },

    effectBindings(){
      if (this.effects[this.index] == 'creative'){
        return {
          creativeEffect: this.getCreativeParams()
        }
      }
      if (this.effects[this.index] == 'cube' ){
        return {
          cubeEffect: this.getCubeParams()
        }
      }
      return null
    },

    //calculate wrapper height from auto to px for export to gwd
    calculateWrapperHeight() {
        const wrapper = document.querySelector('.swiper');
        if (wrapper) {
          const height = wrapper.offsetHeight;
        return height/2+'px';
      }
    },

  // big export code function
  exportCode(){
    const wrapperHeight = this.calculateWrapperHeight()
    const windowHeight = 810;
    const windowWidth = 1440;
    const top = this.positionTop/windowHeight*100+"%";
    const  left = this.positionLeft/windowWidth*100+"%";
    const offset = "-"+this.offset/windowWidth*100+"vw";
    const btnWidth = this.btnWidth/windowWidth*100+"vw";
    const styles = `
    .wrapper {
      height: ${wrapperHeight};
      width: ${this.realSliderWidth()/2}px;
      position:absolute;
      top: ${top};
      left:${left};
    }
    .swiper-slide gwd-image {
      display: block;
      object-fit: cover;
    }
    ${this.buttonVar ? `
      .swiper-button-next{
      top: 50%;
      right: ${offset};
      ${this.btnType== 'default' ? `color: ${this.btnColor}; `:  ``}
    }
    .swiper-button-prev{
      top: 50%;
      left: ${offset};
      ${this.btnType== 'default' ? ` color: ${this.btnColor}; `:  `transform: rotate(180deg);`}
    }
    .swiper-button-next::after{
      ${this.btnType== 'default' && this.buttonVar ? `--swiper-navigation-size: ${btnWidth}; `:  `content:'none';`}
    }
    .swiper-button-prev::after{
      ${this.btnType== 'default' && this.buttonVar ? `--swiper-navigation-size: ${btnWidth}; `:  `content:'none';`}
    }
    ${this.btnType== 'image' ? `.img-arrow{width: ${btnWidth};}`:  ``}
    `:  ``}
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
    `
    let swiperSlidesHtml = ""
    this.images.forEach((image, index) => {
      swiperSlidesHtml += `
      <div class="swiper-slide max-height" id="card${index+1}">
        <div class="max-height" id="slide-wrapper">
          <gwd-image class="slide-content" id="image_${index+1}" src="assets/${image.name}"></gwd-image>
          <gwd-taparea class="slide-content" id="taparea_${index+1}"></gwd-taparea>
        </div>
      </div>
      `;
    });
    // Construct the Swiper component HTML
    const swiperScript = `
    <script* src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script*>
    <script*>
    var swiper = new Swiper(".mySwiper", {
    effect: "${this.effects[this.index]}",
    ${this.effects[this.index] == 'creative' ? 'creativeEffect:'+ JSON.stringify(this.getCreativeParams())+',': ''}
    ${this.effects[this.index] == 'cube' ? 'cubeEffect:'+ JSON.stringify(this.getCubeParams())+',': ''}
    ${this.autoplayVar ? `autoplay: ${this.autoplayVar},`: ''}
    ${this.autoplayVar ? 'autoplay:' + `{ delay: ${this.autoplayDelay} },` : ''}
    slidesPerView: ${this.slideCount},
    spaceBetween: ${this.spaceBetweenSlides/2},
    loop: ${this.loopVar},
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
            slideNextTransitionEnd: (swiper) => {
              messageGateway().message({
                intent: 'adInteraction',
                type: 'Swipe',
                name: 'Gallery Swipe'
              });
            },
            slidePrevTransitionEnd: (swiper) => {
              messageGateway().message({
                intent: 'adInteraction',
                type: 'Swipe',
                name: 'Gallery Swipe'
              });
            },
            autoplay: (swiper) => {
          messageGateway().message({
            intent: 'adInteraction',
            type: 'Swipe',
            name: 'Autoplay - subtract this from Gallery Swipe'
          });
        },
      }
    });
  </script*>
    `; 
    // Define the code you want to export
    const htmlCode = `
      <div class="wrapper">
        <div class="swiper mySwiper max-height">
          <div class="swiper-wrapper max-height" id="cards">
            ${swiperSlidesHtml}
          </div>
        </div>
        ${this.buttonVar ? `
          <div class="swiper-button-next" id="arrow-right">${this.btnType== 'image' ? `<img src='assets/${this.btnImgName}' class='img-arrow'/>`:  ''}</div>
        <div class="swiper-button-prev" id="arrow-left">${this.btnType== 'image' ? `<img src='assets/${this.btnImgName}' class='img-arrow'/>`:  ''}</div>
          `:  ''}
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

  .v-dialog>.v-overlay__content>.v-card>.v-card-text,
  .v-dialog>.v-overlay__content>form>.v-card>.v-card-text {
    color: #0b3144 !important;
  }

  .first {
    position: absolute;
    /* Keep this if you need to position children absolutely */
    margin: 0px !important;
  }


  .swiper {
    margin: 0;
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
    width: 1440px;
    height: 810px;
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
    background-color: #0056b3;
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
    flex-direction: row
  }

  .content-box {
    flex: none;
    width: 100%;
    max-width: 1920px;
    border: 1px solid red;
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
      margin-top: 30px;
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
  }

</style>