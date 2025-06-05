<template>
  <v-dialog v-if="showDialog" v-model="showDialog" style="width: 1200px">
    <v-card>
      <v-card-title>Exported Code</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" v-if="type !== 'scrollable'">
            <div class="codeCopy px-4 py-3">
              <h3>Head import</h3>
              <pre v-text="ContentHead" class="codeBlock"></pre>
              <v-btn id="copy-head-btn" class="copy-btn" variant="tonal" @click="copyHeadCode">
                {{ BtnHead }}
              </v-btn> 
            </div>
          </v-col>
          <v-col cols="6" v-if="type !== 'scrollable'">
            <div class="codeCopy px-4 py-3">
              <h3>CSS code</h3>
              <pre v-text="ContentCss" class="codeBlock"></pre>
              <v-btn id="copy-css-btn" class="copy-btn" variant="tonal" @click="copyCssCode">
                {{ BtnCss }}
              </v-btn> 
            </div>           
          </v-col>
          <v-col cols="6" v-if="type !== 'scrollable'">
            <div class="codeCopy px-4 py-3">
              <h3>HTML code</h3>
              <pre v-text="ContentHtml" class="codeBlock"></pre>
              <v-btn id="copy-html-btn" class="copy-btn" variant="tonal" @click="copyHtmlCode">
                {{ BtnHtml }}
              </v-btn> 
            </div>  
          </v-col>
          <v-col cols="6" v-if="type == 'scrollable'">
            <div class="codeCopy px-4 py-3">
              <h3>CSS code</h3>
              <pre v-text="ContentCssScroll" class="codeBlock"></pre>
              <v-btn id="copy-css-btn" class="copy-btn" variant="tonal" @click="copyCssCodeScroll">
                {{ BtnCss }}
              </v-btn> 
            </div>           
          </v-col>
          <v-col cols="6" v-if="type == 'scrollable'">
            <div class="codeCopy px-4 py-3">
              <h3>HTML code</h3>
              <pre v-text="ContentHtmlScroll" class="codeBlock"></pre>
              <v-btn id="copy-html-btn" class="copy-btn" variant="tonal" @click="copyHtmlCodeScroll">
                {{ BtnHtml }}
              </v-btn> 
            </div>  
          </v-col>
          <v-col cols="6" v-if="type !== 'scrollable'">
            <div class="codeCopy px-4 py-3">
              <h3>JavaScript code</h3>
              <pre v-text="ContentJavaScript" class="codeBlock"></pre>
              <v-btn id="copy-js-btn" class="copy-btn" variant="tonal" @click="copyJavaScriptCode">
                {{ BtnJavaScript }}
              </v-btn>
            </div> 
          </v-col>
        </v-row>




      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="showDialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row class="panel">
    <v-col class="second" cols="3">
      <div class="panel-container">
        
        <Images @imagesUpdated="updateImages" :type/>

        <div class="settings"> 

          <h3 class="pb-2 pt-8">Gallery Settings</h3>
          <v-row>
            
            <!-- Background image -->
            <v-col cols="12" class="p-0">
              <h4 class="py-3">Background Image</h4>
              <v-file-input
                @change="importBgImage"
                v-model="bgImageInput"
                prepend-icon="" 
                :clearable="false"
                append-icon="mdi-close" 
                @click:append="clearBgImage"  
                variant="outlined"
                class="pb-3"
                hide-details
              >
              </v-file-input>
            </v-col>
            <!-- Background image -->

            <!-- Slide Direction -->
            <v-col cols="12" class="p-0"  v-if="type == 'scrollable'">
              <h4 class="py-0">Slide direction</h4>
              <v-select 
                v-model="SlideDirection"
                :items="direction" 
                class="pt-3 pb-3"
                hide-details
                variant="outlined"
              ></v-select> 
            </v-col>
            <!-- Slide Direction -->
             
            <!-- Slide Type changed the names from numbers to titles --> 
             
            <v-col cols="12" class="p-0" v-if="effects[index] == 'creative'">
              <h4 class="py-0">Slide type</h4>
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
                item-text="text"
                item-title="text"
                item-value="value" 
                variant="outlined"
                color="#00e18c"
                hide-details
                class="pt-3 pb-3"
              ></v-select> 
            </v-col>
            <!-- Slide Type changed the names from numbers to titles --> 

            <!-- Slider Width -->
            <v-col cols="8" class="align-self-center p-0">
              <h4>Slider Width</h4>
            </v-col>

            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="sliderWidth"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right"
                hide-details
                density="small" 
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0">
              <v-slider
                v-model="sliderWidth" 
                :step="1" 
                color="#00e18c"
                class="align-center"
                hide-details
              ></v-slider>
            </v-col> 
            <!-- Slider Width -->
             
            <!-- Slider Height  -->
             <template v-if="type === 'scrollable'">
              
              <v-col cols="8" class="align-self-center p-0">
                <h4>Slider Height</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="sliderHeight"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right"
                  hide-details
                  density="small" 
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="p-0">
                <v-slider
                  v-model="sliderHeight" 
                  :step="1" 
                  color="#00e18c"
                  class="align-center"
                  hide-details
                ></v-slider>
              </v-col> 
            </template>
            <!-- Slider Height -->

            <!-- Top Position -->
            <v-col cols="8" class="align-self-center p-0">
              <h4>Top Position</h4>
            </v-col> 
            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="positionTop"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right"
                hide-details
                density="small" 
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0">
              <v-slider
                v-model="positionTop" 
                :step="1" 
                color="#00e18c"
                class="align-center"
                hide-details
              ></v-slider>
            </v-col> 
            <!-- Top Position -->

            <!-- Left Position -->
            <v-col cols="8" class="align-self-center p-0">
              <h4>Left Position</h4>
            </v-col> 
            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="positionLeft"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right"
                hide-details
                density="small" 
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0">
              <v-slider
                v-model="positionLeft" 
                :step="1" 
                color="#00e18c"
                class="align-center"
                hide-details
              ></v-slider>
            </v-col> 
            <!-- Left Position -->

          </v-row>

          <h3 class="pb-2 pt-8" v-if="type == 'scrollable'">Scrollbar Settings</h3>
          <v-row v-if="type == 'scrollable'">
            <!-- Scrollbar width -->
            <v-col cols="8" class="align-self-center p-0">
              <h4>Scrollbar Width</h4>
            </v-col> 
            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="scrollwidth"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right"
                hide-details
                density="small" 
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0">
              <v-slider
                v-model="scrollwidth"  
                :step="1" 
                :min="1"
                :max="10"
                color="#00e18c"
                class="align-center"
                hide-details
              ></v-slider>
            </v-col> 
            <!-- Scrollbar width --> 
             
            <!-- Scrollbar color --> 
            <v-col cols="12" class="p-0">
              <h4 class="pb-2 pt-2">Scrollbar Color</h4> 
              <v-color-picker v-model="scrollColor" swatches-max-height="100px" mode="hexa" class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </v-col>
            <!-- Scrollbar color --> 

            <!-- Scrollbar color --> 
            <v-col cols="12" class="p-0">
              <h4 class="pb-2 pt-0">Scrollbar Hover Color</h4>
              <v-color-picker  v-model="scrollhoverColor" swatches-max-height="100px" mode="hexa" class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </v-col>
            <!-- Scrollbar color --> 

          </v-row>
          <h3 class="pb-2 pt-8" v-if="type == 'scrollable'">Animation Settings</h3>
          <v-row v-if="type == 'scrollable'">
            <!-- Animation Direction -->
            <v-col cols="6" class="pl-0 pt-2 pb-1" v-if="type == 'scrollable'">
              <h4 class="py-0">Animation</h4>
              <v-select 
                v-model="AnimationSlide"
                :items="animation" 
                class="pt-3 pb-0"
                hide-details
                variant="outlined"
              ></v-select> 
            </v-col>
            <!-- Animation Direction -->

            <!-- Easing -->
            <v-col cols="6" class="pr-0 pt-2 pb-1" v-if="type == 'scrollable'">
              <h4 class="py-0">Easing</h4>
              <v-select 
                v-model="Easing"
                :items="easing" 
                class="pt-3 pb-0"
                hide-details
                variant="outlined"
              ></v-select> 
            </v-col>
            <!-- Easing -->
 
            <!-- Slide Duration -->
            <v-col cols="8" class="align-self-center p-0" v-if="type == 'scrollable' && AnimationSlide !== 'None'">
              <h4>Duration</h4>
            </v-col> 
            <v-col cols="4" class="p-0" v-if="type == 'scrollable' && AnimationSlide !== 'None'">
              <v-text-field 
                v-model="slideDuration"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right"
                hide-details
                density="small" 
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0" v-if="type == 'scrollable' && AnimationSlide !== 'None'">
              <v-slider
                v-model="slideDuration" 
                :step="0.1" 
                :min="0.1"
                :max="10"
                color="#00e18c"
                class="align-center"
                hide-details
              ></v-slider>
            </v-col> 
            <!-- Left Position -->

            <!-- Slides per View -->
            <template v-if="this.type == 'multiple'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Slides Per View</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="slideCount"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right"
                  hide-details
                  density="small" 
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="p-0">
                <v-slider
                  v-model="slideCount" 
                  :step="1" 
                  color="#00e18c"
                  class="align-center"
                  hide-details
                  :max="6"
                ></v-slider>
              </v-col> 
            </template>
            <!-- Slides per View -->

            
            <!-- Space between slides -->
            <template v-if="this.type == 'multiple'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Space Between Slides</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="spaceBetweenSlides"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right"
                  hide-details
                  density="small" 
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="p-0">
                <v-slider
                  v-model="spaceBetweenSlides" 
                  :step="1" 
                  color="#00e18c"
                  class="align-center"
                  hide-details 
                ></v-slider>
              </v-col> 
            </template>
            <!-- Space between slides -->
              
            <!-- Transition duration -->
            <template v-if="this.type != 'scrollable'">
              <v-col cols="7" class="align-self-center p-0">
                <h4>Animation speed</h4>
              </v-col> 
              <v-col cols="5" class="p-0">
                <v-text-field 
                  v-model="transitionDuration"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right"
                  hide-details
                  density="small" 
                  :model-value="`${transitionDuration} ms`"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="p-0">
                <v-slider
                  v-model="transitionDuration" 
                  :step="50" 
                  :max="5000"
                  color="#00e18c"
                  class="align-center"
                  hide-details 
                ></v-slider>
              </v-col> 
            </template>
            <!-- Transition duration -->
          </v-row>
              



          <v-switch
           v-if="type != 'scrollable'"
            v-model="loopVar"
            color="#00e18c"
            label="Enable Loop"
            density="small"
            class="pb-2 pt-5"
            inset
            hide-details
          ></v-switch>
          <v-switch
            v-if="this.type == 'cube'"
            v-model="cubeShadow"
            color="#00e18c"
            label="Enable Shadow"
            density="small"
            class="pb-2"
            inset
            hide-details
          ></v-switch>
          <v-switch
            v-model="autoplayVar"
            color="#00e18c"
            label="Enable autoplay"
            density="small"
            class="pb-2"
            inset
            hide-details
            v-if="type !== 'scrollable'"
          ></v-switch>
          <v-row class="pb-5" v-if="autoplayVar">
            <!-- Delay -->
            <template v-if="autoplayVar">
              <v-col cols="7" class="align-self-center p-0">
                <h4>Delay</h4>
              </v-col> 
              <v-col cols="5" class="p-0">
                <v-text-field 
                  v-model="autoplayDelay"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right"
                  hide-details
                  density="small" 
                  :model-value="`${autoplayDelay} ms`"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="p-0">
                <v-slider
                  v-model="autoplayDelay" 
                  :step="50" 
                  :max="5000"
                  color="#00e18c"
                  class="align-center"
                  hide-details 
                ></v-slider>
              </v-col> 
            </template>
            <!-- Delay -->
          </v-row> 
          <v-switch
            v-model="autoplayInt"
            v-if="autoplayVar"
            color="#00e18c"
            label="Disable Autoplay On Interaction"
            density="small"
            class="pb-2"
            inset
            hide-details
          ></v-switch>

          
          <v-switch
            v-if="type !== 'scrollable'"
            v-model="buttonVar"
            color="#00e18c"
            label="Side buttons"
            density="small"
            class="pb-1"
            inset
            hide-details
          ></v-switch>

          <h3 class="pb-2 pt-8" v-if="buttonVar">Arrow Navigation Settings</h3>
          
            <v-row> 
              <!-- Arrow Side Offset -->
               <template v-if="buttonVar">
                <v-col cols="8" class="align-self-center p-0">
                  <h4>Side Offset</h4>
                </v-col> 
                <v-col cols="4" class="p-0">
                  <v-text-field 
                    v-model="offset"
                    type="text"   
                    @input="validateInput" 
                    :max="maxOffset"
                    :min="minOffset"
                    variant="outlined solo"
                    class="white center text-right"
                    hide-details
                    density="small" 
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="p-0">
                  <v-slider
                    v-model="offset" 
                    :step="1" 
                    :max="maxOffset"
                    :min="minOffset"
                    color="#00e18c"
                    class="align-center"
                    hide-details
                  ></v-slider>
                </v-col>
              </template>
              <!-- Arrow Side Offset -->
               
              <!-- Arrow Size-->
               <template v-if="buttonVar">
                <v-col cols="8" class="align-self-center p-0">
                  <h4>Icon Size</h4>
                </v-col> 
                <v-col cols="4" class="p-0">
                  <v-text-field 
                    v-model="btnWidth"
                    type="text"   
                    @input="validateInput" 
                    variant="outlined solo"
                    class="white center text-right"
                    hide-details
                    density="small" 
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="p-0">
                  <v-slider
                    v-model="btnWidth" 
                    :step="1" 
                    color="#00e18c"
                    class="align-center"
                    hide-details
                  ></v-slider>
                </v-col>
              </template>
              <!-- Arrow Size-->
            </v-row> 
          <div v-if="buttonVar">
            <v-select
              v-model="btnType"
              :items="['default', 'image']"
              label="Button Type"
              item-text="text"
              item-value="value"
              return-object
              class="pt-3"
              variant="outlined"
            ></v-select>

            <div v-if="btnType == 'default'">
              
              <h4 class="pb-2">Color</h4>
              <v-color-picker v-model="btnColor" :swatches="swatches" swatches-max-height="100px" mode="hexa" show-swatches class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </div>

            <div v-else>
              <v-file-input
                clearable
                @change="importBtnImage"
                prepend-icon=""
                label="Upload Button image"
                variant="outlined"
              ></v-file-input>
            </div>
             
          </div>
          
           

        </div>
      </div>
    </v-col>
    <v-col class="artboard" cols="9"> 
      <v-btn prepend-icon="mdi-xml" variant="text" @click="exportCode" id="activator-target">
        Export Code
      </v-btn>
      <div class="artboard-size"> 
        <v-btn-toggle
          v-model="text"
          color="#00e18c" 
          class="text-color-1"
          rounded="4"
          group
          divided 
        >
          <v-btn size="small" value="1">
            16:9
          </v-btn>
 
          <v-btn size="small" value="2">
            1:1
          </v-btn>

          <v-btn size="small" value="3">
            9:16
          </v-btn>

          <v-btn size="small" value="4">
            ShopAd
          </v-btn>
          <v-btn size="small" value="5">
            Companion Banner
          </v-btn>
        </v-btn-toggle> 
        
      </div>
      <div class="content-box" :class="artboardClass"
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
              :speed="transitionDuration"
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
          <!-- <div 
            :style="
                index == 1
                  ? { top: positionTop + '%', left: positionLeft + '%', height: realSliderHeight() + '%', width: realSliderWidth() + '%' }
                  : { top: positionTop + '%', left: positionLeft + '%', height: realSliderHeight() + '%', width: realSliderWidth() + '%' }"
            
                :class="['scrollable', SlideDirection === 'vertical' ? 'vertical' : 'horizontal']"
          > -->
          
            <div v-if="type === 'scrollable' && images?.length" id="scrollable" :style="
                index == 1
                  ? { top: positionTop + '%', left: positionLeft + '%', height: realSliderHeight() + '%', width: realSliderWidth() + '%','--scroll-thumb-width': scrollwidth + 'px','--scroll-thumb-height': scrollheight + 'px','--scroll-thumb-color': scrollColor,'--scroll-thumb-color-hover': scrollhoverColor }
                  : { top: positionTop + '%', left: positionLeft + '%', height: realSliderHeight() + '%', width: realSliderWidth() + '%','--scroll-thumb-width': scrollwidth + 'px','--scroll-thumb-height': scrollheight + 'px','--scroll-thumb-color': scrollColor,'--scroll-thumb-color-hover': scrollhoverColor }"
            
                :class="['scrollable', SlideDirection === 'vertical' ? 'vertical' : 'horizontal']">

              <div v-for="(image, index) in images" :key="index" :id="'Card' + (index + 1)" class="scrollcard"  >
                <gwd-taparea :id="'Card' + (index + 1) + 'TapArea'" class="taparea"></gwd-taparea>
                <div class="base" :id="'Card' + (index + 1) + 'BaseImage'">
                  <img :src="image.url"/>
                </div>
                <div class="hover" :id="'Card' + (index + 1) + 'HoverImage'">
                  <img :src="image.hoverUrl" v-if="image.hoverUrl"/>
                </div>
                
                
              </div> 
            </div>

          <!-- </div>  -->
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
       
      animation: ['None','Slide left', 'Slide right', 'Slide up', 'Slide down'],
      AnimationSlide: 'None',
      Easing: 'Linear',
      easing: ['Linear','Ease', 'Ease-In', 'Ease-Out', 'Ease-In-Out'],
      direction: ['vertical', 'horizontal'],
      SlideDirection: 'vertical',
      swatches: [
        ['#FF0000', '#550000'],
        ['#FFFF00', '#555500'],
        ['#00FF00', '#005500'],
        ['#00FFFF', '#005555'],
        ['#0000FF', '#000055'],
      ],
      
      text: '1',
      images: [],    
      selectedImage: null, 
      selectedHoverImage: null,
      // params
      positionTop: 0,
      positionLeft: 0,
      scrollwidth: 3, 
      slideDuration: 0.3,
      slideCount: 1,
      spaceBetweenSlides: 0, 
      transitionDuration: 300,
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
      scrollColor: "#000",
      scrollhoverColor: "#666",
      btnType: "default",
      btnWidth: 25,
      btnImg: null,

      // for pop-up dialog
      btnImgName: "",
      ContentJavaScript: "",
      ContentHtml: "",
      ContentHtmlScroll: "",
      ContentCss: "",
      ContentCssScroll: "",
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
  computed: {
    artboardClass() {
      // Map value to class name
      return {
        'aspect-16-9': this.text === '1',
        'aspect-1-1': this.text === '2',
        'aspect-9-16': this.text === '3',
        'shop-ad': this.text === '4',
        'companion-banner': this.text === '5',
      };
    },
  },

  methods: {  
    getCardStyle(index) { 
      const sizePercent = 100;

      if (this.SlideDirection === 'vertical') {
        return {
          position: 'absolute',
          top: `${index * (sizePercent*.5)}%`, //  kunin yung height ng image tapos ilagay sa top as % value
          left: '0%',
          // height: `${sizePercent}%`, // lagay dito yung height ng image tapos convert sa %
          width: '100%'
        };
      } else {
        // horizontal
        return {
          position: 'absolute',
          top: '0%',
          left: `${index * sizePercent}%`,
          // width: `${sizePercent}%`,
          height: '100%'
        };
      }
    },
    onDurationInput(val) {
      // Remove "ms" and parse number
      const numericValue = parseInt(val.replace(/[^\d]/g, '')) || 0;
      this.transitionDuration = numericValue;
    },
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
    copyCssCodeScroll() {
      navigator.clipboard
        .writeText(this.trim(this.ContentCssScroll))
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
    copyHtmlCodeScroll() {
      navigator.clipboard
        .writeText(this.trim(this.ContentHtmlScroll))
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

      // scrollable variables
      const scrollwidth = this.sliderWidth + "%";
      const scrollheight = this.sliderHeight + "%";
      const scrollbarwidth = this.scrollwidth + "%"; 
      const scrollcolor = this.scrollColor;
      const scrollhovercolor = this.scrollhoverColor;

      const stylesScroll = `
.scrollable {
  position: absolute; 
  top: ${top};
  left:  ${left};
  width: ${scrollwidth};
  height: ${scrollheight};
}
.scrollable #scrollable, #scrollable img {
  height: 100%; 
  width: 100%;
  border-style: none;
}
.vertical{ 
  overflow: hidden auto;
}
.horizontal{ 
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;  
}
.horizontal .scrollcard { 
  display: flex;
  align-items: center;
  justify-content: center; 
  scroll-snap-align: start;
  flex-shrink: 0; 
}
.horizontal .base { 
  height: 100%;
}
.base {  
  line-height: 0;
}
.scrollcard {  
  position: relative;
}
.scrollcard:last-child {
  margin: 0;
}
.scrollcard:hover .hover {
  opacity: 1;
} 
.hover { 
  position: absolute; 
  top: 0%;
  left: 0%;
  line-height: 0;
  opacity: 0;
  cursor: pointer;
}
.hover {
}
#scrollable::-webkit-scrollbar {
  width: ${scrollbarwidth};
  height: ${scrollbarwidth};
} 
#scrollable::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
} 
#scrollable::-webkit-scrollbar-thumb {
  background: ${scrollcolor};
} 
#scrollable::-webkit-scrollbar-thumb:hover {
  background: ${scrollhovercolor};
}
.taparea {
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  width: 100%;
  height: 100%;
}
 
      `;


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

let scrollSlideHtml = "";
this.images.forEach((image, index) => {
  scrollSlideHtml += `
    <div id="Card${index + 1}" class="scrollcard">
      <gwd-taparea id="Card${index + 1}TapArea" class="taparea"></gwd-taparea>
      <div class="base" id="Card${index + 1}BaseImage">
        <img src="assets/${image.name}">
      </div>
      ${image.hoverName ? `
      <div class="hover" id="Card${index + 1}HoverImage">
        <img src="assets/${image.hoverName}">
      </div>` : ""}
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
    speed: ${this.transitionDuration},
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

      
 const htmlCodeScroll = `
<div id="scrollable" class="scrollable ${this.SlideDirection}">
  ${scrollSlideHtml} 
</div>
    `;

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
        `: ""}
</div>
    `;
      this.ContentHead = `<pre><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/></pre>`;
      this.ContentHtml = `<pre>${htmlCode}</pre>`;
      this.ContentHtmlScroll = `<pre>${htmlCodeScroll}</pre>`;
      this.ContentCss = `<pre>${styles}</pre>`;
      this.ContentCssScroll = `<pre>${stylesScroll}</pre>`;
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
  padding: 0rem 1.5rem;
  width: 100%;

  
}
/* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #FFFFFF #DADADA;
}*/

/* Chrome, Edge and Safari */
.panel-container::-webkit-scrollbar {
  height: 3px;
  width: 3px;
}
.panel-container::-webkit-scrollbar-track {
  border-radius: px;
  background-color: rgba(0, 0, 0, 0);
}

.panel-container::-webkit-scrollbar-track:hover {
  background-color: #0b3144;
}

.panel-container::-webkit-scrollbar-track:active {
  background-color: #0b3144;
}

.panel-container::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background-color: rgba(100, 100, 100, 0.7);
}

.panel-container::-webkit-scrollbar-thumb:hover {
  background-color: rgb(85, 85, 85);
}

.panel-container::-webkit-scrollbar-thumb:active {
  background-color: #ffffff8e;
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
.vertical{ 
  overflow: hidden auto;
}
.horizontal{ 
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;  
} 
.horizontal .scrollcard { 
  display: flex;
  align-items: center;
  justify-content: center;
  
  scroll-snap-align: start;
  flex-shrink: 0;
   
}

#scrollable::-webkit-scrollbar {
  width: var(--scroll-thumb-width);   /* vertical scrollbar thickness */
  height: var(--scroll-thumb-width);  /* horizontal scrollbar thickness */
}

#scrollable::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

#scrollable::-webkit-scrollbar-thumb {
  background: var(--scroll-thumb-color);
}

#scrollable::-webkit-scrollbar-thumb:hover {
  background: var(--scroll-thumb-color-hover);
}


.scrollable #scrollable, #scrollable img {
  height: 100%; 
  width: 100%;
}
.horizontal .base { 
  height: 100%;
}
.base {  
  line-height: 0;
}
.hover { 
  position: absolute; 
  top: 0%;
  left: 0%;
  line-height: 0;
}
.hover {
  opacity: 0;
  cursor: pointer;
}
.scrollcard {  
  position: relative;
}
.scrollcard:hover .hover {
  opacity: 1;
}
/* .scrollcard img {
  position: absolute; 
  top: 0%;
  left: 0%;
} */

.scrollcard:last-child {
  margin: 0;

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
  overflow: hidden;
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
  /* padding: 2rem 1rem; */
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
 overflow: hidden; 
 width: 100%;
 height: 100%;
 position: relative;
 min-height: 100px;
} 
.copy-btn {
  position: absolute;
  bottom: 4.5%;
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
.artboard {
  position: relative;
}
.artboard-size {
  position: absolute;
  top: 1.6%; 
  left: 2%;
}
#activator-target{
  
  top: 1.6%;
  right: 1%;
  position: fixed;
  background-color: #00e18c;
  /* Bootstrap primary color */
  color: #2b4d5e;
  /* border: none; */
  /* border-radius: 5px; */
  /* padding: 10px 20px; */
  /* font-size: 16px; */
  cursor: pointer; 
}
.text-color-1 button{
  color: #2b4d5e !important; 
}
.aspect-16-9 {
  aspect-ratio: 16/9;
}
.aspect-1-1 {
  width: 50%;
  aspect-ratio: 1/1;
}
.aspect-9-16 {
  width: 32%;
  aspect-ratio: 9/16;
}
.shop-ad { 
  aspect-ratio: 9/4;
}
.companion-banner {
  aspect-ratio: 9/2;
}
.white span{
  color: #f0f0f0 !important; /* or any desired color */
}
/* .d-flex :deep(.v-text-field) { 
  display: flex;
  justify-content: space-between; 
 flex-direction: row;
}
.d-flex.v-slider.v-input--horizontal {
  margin: 0;
  display: flex !important;
  justify-content: space-between; 
 flex-direction: column !important;
}
.d-flex .v-slider, .d-flex .v-slider :deep(.v-input__prepend), .d-flex :deep(.v-input__control){
  width: 100%;
} 
.d-flex .v-input--center-affix .v-input__prepend {
  width: 100%;
}
.d-flex :deep(.v-text-field) {
  width: 45%;
} 
.d-flex :deep(.v-input__prepend ){
  width: 100%;
  margin: 0;
} */
 .p-0  {
  padding: 0; 
 }
 .mt-0 {
  margin-top: 0px;
 }
 .text-right :deep(input) {
      text-align: right;
      padding-top: .5rem;
      padding-bottom: .5rem;
  }
.v-slider.v-input--horizontal {
  margin:0rem .6rem 0rem 0rem
}
.sortable-fallback, .sortable-chosen {
  opacity: 0;
}
.animate-x {
  transform: translateX(0);
}
.animate-y {
  transform: translateY(0);
}
.slide-left-animation {
  transform: translateX(100%);
}
.slide-right-animation {
  transform: translateX(-100%);
}
.slide-top-animation {
  transform: translateX(-100%);
}
.slide-bot-animation {
  transform: translateX(100%);
}
.linear {
  transition-timing-function: linear;
}
.ease {
  transition-timing-function: ease;
}
.ease-in {
  transition-timing-function: ease-in;
}
.ease-out {
  transition-timing-function: ease-out;
}
.ease-in-out {
  transition-timing-function: ease-in-out;
}
</style>
