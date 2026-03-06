<template>
  <v-dialog v-if="showDialog" v-model="showDialog" style="width: 1200px">
    <v-card class="bg-grey-darken-4 text-white">
      <v-card-title>Exported Code</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" v-if="type !== 'scroller'">
            <div class="codeCopy px-4 py-3 rounded-lg">
              <h3>Head import</h3>
              <pre v-text="ContentHead" class="codeBlock"></pre>
              <v-btn id="copy-head-btn" class="copy-btn" variant="tonal" @click="copyHeadCode">
                {{ BtnHead }}
              </v-btn> 
            </div>
          </v-col>
          <v-col cols="6" v-if="type !== 'scroller'">
            <div class="codeCopy px-4 py-3 rounded-lg">
              <h3>CSS code</h3>
              <pre v-text="ContentCss" class="codeBlock"></pre>
              <v-btn id="copy-css-btn" class="copy-btn" variant="tonal" @click="copyCssCode">
                {{ BtnCss }}
              </v-btn> 
            </div>           
          </v-col>
          <v-col cols="6" v-if="type !== 'scroller'">
            <div class="codeCopy px-4 py-3 rounded-lg">
              <h3>HTML code</h3>
              <pre v-text="ContentHtml" class="codeBlock"></pre>
              <v-btn id="copy-html-btn" class="copy-btn" variant="tonal" @click="copyHtmlCode">
                {{ BtnHtml }}
              </v-btn> 
            </div>  
          </v-col>
          <v-col cols="6" v-if="type == 'scroller'">
            <div class="codeCopy px-4 py-3 rounded-lg">
              <h3>CSS code</h3>
              <pre v-text="ContentCssScroll" class="codeBlock"></pre>
              <v-btn id="copy-css-btn" class="copy-btn" variant="tonal" @click="copyCssCodeScroll">
                {{ BtnCss }}
              </v-btn> 
            </div>           
          </v-col>
          <v-col cols="6" v-if="type == 'scroller'">
            <div class="codeCopy px-4 py-3 rounded-lg">
              <h3>HTML code</h3>
              <pre v-text="ContentHtmlScroll" class="codeBlock"></pre>
              <v-btn id="copy-html-btn" class="copy-btn" variant="tonal" @click="copyHtmlCodeScroll">
                {{ BtnHtml }}
              </v-btn> 
            </div>  
          </v-col>
          <v-col cols="6" v-if="type !== 'scroller'">
            <div class="codeCopy px-4 py-3 rounded-lg">
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
        <v-btn text color="#a1a1aa" @click="showDialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="studio-layout">
    
    <div class="studio-sidebar">
      <div class="sidebar-header"> 
      </div>
      
      <div class="sidebar-content panel-container">
        <Images @imagesUpdated="updateImages" :type/>

        <div class="settings-section settings"> 
          <h3 class="pb-2 pt-4 border-b">Gallery Settings</h3>
          <v-row class="mt-4">
            
            <v-col cols="12" class="p-0"  v-if="type == 'scroller'">
              <h4 class="py-3">Scroller Background Image</h4>
              <v-file-input
                @change="importScrollerBgImage"
                v-model="bgScrollerImageInput"
                prepend-icon="" 
                :clearable="false"
                append-icon="mdi-close" 
                @click:append="clearScrollerBgImage"  
                variant="outlined"
                class="pb-1 custom-vuetify-input"
                hide-details
              >
              </v-file-input>
            </v-col>

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
                class="pb-4 custom-vuetify-input"
                hide-details
              >
              </v-file-input>
            </v-col>

            <v-col cols="12" class="p-0"  v-if="type == 'scroller'">
              <h4 class="py-0">Slide direction</h4>
              <v-select 
                v-model="SlideDirection"
                :items="direction" 
                class="pt-3 pb-3 custom-vuetify-input"
                hide-details
                variant="outlined"
              ></v-select> 
            </v-col>
             
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
                class="pt-3 pb-3 custom-vuetify-input"
              ></v-select> 
            </v-col>

            <template v-if="type != 'drag & drop'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Slider Width</h4>
              </v-col>

              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="sliderWidth"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right custom-vuetify-input"
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
            </template>
             
            <template v-if="type === 'scroller'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Slider Height</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="sliderHeight"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right custom-vuetify-input"
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

            <template v-if="type === 'scroller'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Padding (rem)</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="padding"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right custom-vuetify-input"
                  hide-details
                  density="small" 
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="p-0">
                <v-slider
                  v-model="padding" 
                  :step="0.1" 
                  :min="0.1"
                  :max="1.5"
                  color="#00e18c"
                  class="align-center"
                  hide-details
                ></v-slider>
              </v-col> 
            </template>

            <v-col cols="8" class="align-self-center p-0">
              <h4>Top Position</h4>
            </v-col> 
            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="positionTop"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right custom-vuetify-input"
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

            <v-col cols="8" class="align-self-center p-0">
              <h4>Left Position</h4>
            </v-col> 
            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="positionLeft"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right custom-vuetify-input"
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

            <template v-if="this.type == 'carousel'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Slides Per View</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="slideCount"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right custom-vuetify-input"
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

            <template v-if="this.type == 'carousel'">
              <v-col cols="8" class="align-self-center p-0">
                <h4>Space Between Slides</h4>
              </v-col> 
              <v-col cols="4" class="p-0">
                <v-text-field 
                  v-model="spaceBetweenSlides"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right custom-vuetify-input"
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
          </v-row>

          <h3 class="pb-2 pt-8 border-b" v-if="type == 'scroller'">Scrollbar Settings</h3>
          <v-row v-if="type == 'scroller'" class="mt-4">
            <v-col cols="8" class="align-self-center p-0">
              <h4>Scrollbar Width</h4>
            </v-col> 
            <v-col cols="4" class="p-0">
              <v-text-field 
                v-model="scrollwidth"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right custom-vuetify-input"
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
             
            <v-col cols="12" class="p-0">
              <h4 class="pb-2 pt-2">Scrollbar Color</h4> 
              <v-color-picker v-model="scrollColor" swatches-max-height="100px" mode="hexa" class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </v-col>

            <v-col cols="12" class="p-0">
              <h4 class="pb-2 pt-0">Scrollbar Hover Color</h4>
              <v-color-picker  v-model="scrollhoverColor" swatches-max-height="100px" mode="hexa" class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </v-col>
          </v-row>

          <h3 class="pb-2 pt-8 border-b" v-if="type == 'scroller'">Other Settings</h3>
          <v-row v-if="type == 'scroller'" class="mt-4">
            <v-col cols="12" class="pl-0 pt-2 pb-1" v-if="type == 'scroller'">
              <h4 class="py-0">Loop</h4> 
                <v-switch
                v-if="type == 'scroller'"
                  v-model="loopScrollVar"
                  color="#00e18c"
                  label="Enable"
                  density="small"
                  class="pb-2 pt-2"
                  inset
                  hide-details
                ></v-switch>
            </v-col>

            <v-col cols="6" class="pl-0 pt-2 pb-1" v-if="loopScrollVar == true">
              <h4 class="py-0">Animate</h4>
                <v-switch
                v-if="type == 'scroller'"
                  v-model="autoAnimate"
                  color="#00e18c"
                  label="Enable"
                  density="small"
                  class="pb-2 pt-2"
                  inset
                  hide-details
                ></v-switch>
            </v-col>

            <v-col cols="6" class="pr-0 pt-2 pb-1" v-if="autoAnimate == true && loopScrollVar == true">
              <h4 class="py-0">Easing</h4>
              <v-select 
                v-model="selectedEasing"
                :items="easing" 
                class="pt-3 pb-0 custom-vuetify-input"
                hide-details
                variant="outlined"
              ></v-select> 
            </v-col>
 
            <v-col cols="8" class="align-self-center p-0" v-if="type == 'scroller' && autoAnimate == true && loopScrollVar == true">
              <h4>Duration Speed</h4>
            </v-col> 
            <v-col cols="4" class="p-0" v-if="type == 'scroller' && autoAnimate == true && loopScrollVar == true">
              <v-text-field 
                v-model="slideDuration"
                type="text"   
                @input="validateInput" 
                variant="outlined solo"
                class="white center text-right custom-vuetify-input"
                hide-details
                density="small" 
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0" v-if="type == 'scroller' && autoAnimate == true && loopScrollVar == true">
              <v-slider
                v-model="slideDuration" 
                :step="0.1" 
                :min="0.1"
                :max="25"
                color="#00e18c"
                class="align-center"
                hide-details
              ></v-slider>
            </v-col> 
          </v-row>
              
          <v-row class="mt-4">
            <template v-if="this.type != 'scroller'">
              <v-col cols="7" class="align-self-center p-0">
                <h4>Animation speed</h4>
              </v-col> 
              <v-col cols="5" class="p-0">
                <v-text-field 
                  v-model="transitionDuration"
                  type="text"   
                  @input="validateInput" 
                  variant="outlined solo"
                  class="white center text-right custom-vuetify-input"
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
          </v-row>

          <v-switch
           v-if="type != 'scroller'"
            v-model="loopVar"
            color="#00e18c"
            label="Enable Loop"
            density="small"
            class="pb-2 pt-2"
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
            v-if="type !== 'scroller'"
          ></v-switch>
          
          <v-row class="pb-5 mt-2" v-if="autoplayVar">
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
                  class="white center text-right custom-vuetify-input"
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
            v-if="type !== 'scroller'"
            v-model="buttonVar"
            color="#00e18c"
            label="Side buttons"
            density="small"
            class="pb-1 pt-4 border-t"
            inset
            hide-details
          ></v-switch>

          <div v-if="buttonVar" class="mt-4">
            <h3 class="pb-2">Arrow Navigation Settings</h3>
            <v-row> 
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
                    class="white center text-right custom-vuetify-input"
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
                    class="white center text-right custom-vuetify-input"
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
            </v-row> 
          
            <v-select
              v-model="btnType"
              :items="['default', 'image']"
              label="Button Type"
              item-text="text"
              item-value="value"
              return-object
              class="pt-3 custom-vuetify-input"
              variant="outlined"
            ></v-select>

            <div v-if="btnType == 'default'" class="mt-4">
              <h4 class="pb-2">Color</h4>
              <v-color-picker v-model="btnColor" :swatches="swatches" swatches-max-height="100px" mode="hexa" show-swatches class="color-picker" style="max-width:none; width: 100%;"></v-color-picker>
            </div>

            <div v-else class="mt-4">
              <v-file-input
                clearable
                @change="importBtnImage"
                prepend-icon=""
                label="Upload Button image"
                variant="outlined"
                class="custom-vuetify-input"
              ></v-file-input>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="studio-canvas artboard">
      <div class="canvas-toolbar">
        <v-btn-toggle
          v-model="text"
          class="ratio-toggle"
          mandatory
        >
          <v-btn size="small" value="1">16:9</v-btn>
          <v-btn size="small" value="2">1:1</v-btn>
          <v-btn size="small" value="3">9:16</v-btn>
          <v-btn size="small" value="4">ShopAd</v-btn>
          <v-btn size="small" value="5">Companion</v-btn>
        </v-btn-toggle>
        
        <v-btn class="export-btn" prepend-icon="mdi-xml" variant="flat" color="#00e18c" @click="exportCode">
          Export Code
        </v-btn>
      </div>

      <div class="content-box" :class="artboardClass"
        :style="background ? { backgroundImage: 'url(' + background + ')', backgroundSize: 'contain', position: 'relative' } : { position: 'relative' }">
        
        <div 
          :style="index == 1 ? { top: positionTop + '%', left: positionLeft + '%', width: realSliderWidth() + '%' } : { top: positionTop + '%', left: positionLeft + '%', width: realSliderWidth() + '%' }"
          class="first"
        >
          <div v-if="images && images.length">
            <Swiper
              v-if="type === 'carousel' || type === 'cube' || type === 'creative' || type === 'fade'"
              :key="creativeType + cubeShadow"
              :style="index == 1 ? { overflow: 'visible' } : ''"
              class="swiper mySwiper testcallout swiper-navigation-vertical"
              :modules="modules[index]"
              :effect="effects[index]"
              :navigation="getSwiperNavigation()"
              :autoplay="{ delay: autoplayDelay, disableOnInteraction: autoplayInt }"
              :loop="loopVar"
              :slidesPerView="type === 'scroller' ? 'auto' : slideCount"
              :spaceBetween="spaceBetweenSlides"
              :mousewheel="type === 'scroller'"
              :free-mode="type === 'scroller'"
              :direction="type === 'scroller' ? 'horizontal' : undefined"
              :observe="true"
              :speed="transitionDuration"
              :observe-parents="true"
              :breakpoints="{
                200: { spaceBetween: spaceBetweenSlides / 3 },
                400: { spaceBetween: spaceBetweenSlides / 3 },
                640: { spaceBetween: spaceBetweenSlides },
                1024: { spaceBetween: spaceBetweenSlides }
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
                </div>
                <div
                  v-if="getSwiperNavigation() != false"
                  class="swiper-button-next"
                  :style="getSwiperNavigationRight()"
                  v-bind:class="{ 'swiper-custom-next': btnType == 'image' }"
                ></div>
          </div>
        </div> 
          
        <div
          v-if="type === 'scroller' && images?.length"
          id="scrollable"
          :class="[
            'scrollable',
            SlideDirection === 'vertical' ? 'vertical' : 'horizontal',
            loopScrollVar ? 'loop' : '',
            loopScrollVar && autoAnimate ? 'autoloop' : ''
          ]"
          :style="{
            top: positionTop + '%',
            left: positionLeft + '%',
            height: realSliderHeight() + '%',
            width: realSliderWidth() + '%',
            '--scroll-thumb-width': scrollwidth + 'px',
            '--scroll-thumb-height': scrollheight + 'px',
            '--scroll-thumb-color': scrollColor,
            '--scroll-thumb-color-hover': scrollhoverColor,
            backgroundImage: 'url(' + scrollerBackground + ')',
            backgroundSize: 'cover'
          }"
        >
          <div :class="['scroll-inner', slideDuration ? selectedEasing : '']" :style="'animation-duration:' + slideDuration + 's'">
            <div
              v-for="(image, index) in loopScrollVar ? [...images, ...images, ...images] : images"
              :key="index"
              class="scrollcard"
              :id="'Card' + (index + 1)"
              :style="{ margin: padding + 'rem' }"
            >
              <gwd-taparea :id="'Card' + (index + 1) + 'TapArea'" class="taparea" />
              <div class="base" :id="'Card' + (index + 1) + 'BaseImage'">
                <img :src="image.url" />
              </div>
              <div class="hover" :id="'Card' + (index + 1) + 'HoverImage'">
                <img :src="image.hoverUrl" v-if="image.hoverUrl" />
              </div>
            </div>
          </div>
        </div>
        
        <div
          v-if="type === 'drag & drop' && images?.length"
          id="dragdrop" 
          :style="{
            top: positionTop + '%',
            left: positionLeft + '%',
            height: realSliderHeight() + '%',
            width: realSliderWidth() + '%',
          }">
        </div>
      </div> 
    </div>
  </div>
</template>
 
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectCube, EffectFade, FreeMode, Mousewheel, Navigation, EffectCreative } from "swiper/modules";
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
    type: { type: String },
    index: { type: Number },
  },
  data() {
    return {
      animation: ['None','Slide left', 'Slide right', 'Slide up', 'Slide down'],
      AnimationSlide: 'None',
      selectedEasing: 'linear',
      easing: ['linear','ease', 'ease-in', 'ease-out', 'ease-in-out'],
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
      positionTop: 0,
      positionLeft: 0,
      scrollwidth: 3, 
      slideDuration: 3,
      slideCount: 1,
      spaceBetweenSlides: 0, 
      transitionDuration: 300,
      sliderWidth: 40,
      sliderHeight: 40,
      padding: 0,
      loopVar: false,
      loopScrollVar: false,
      autoAnimate: false,
      autoplayVar: false,
      autoplayInt: false,
      autoplayDelay: 2000,
      swiper: null,
      background: null,
      scrollerBackground: null,
      scrollerBgFileName: '',  
      showDialog: false,
      bgImageInput: null,
      bgScrollerImageInput: null, 
      scrollRef: null,
      itemSize: 0, 
      visibleItems: 0,
      buttonVar: false,
      offset: 4,
      minOffset: -15,   
      maxOffset: 30,    
      btnColor: "#fff",
      scrollColor: "#000",
      scrollhoverColor: "#666",
      btnType: "default",
      btnWidth: 25,
      btnImg: null,
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
      creativeType: 3,
      cubeShadow: false,
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
    };
  },
  computed: {
    artboardClass() {
      return {
        'aspect-16-9': this.text === '1',
        'aspect-1-1': this.text === '2',
        'aspect-9-16': this.text === '3',
        'shop-ad': this.text === '4',
        'companion-banner': this.text === '5',
      };
    },
  },
  mounted() {  
    this.$nextTick(() => {
      if (this.loopScrollVar) {
        this.initLoopScroll();
      }
    });
  },
  methods: {   
    initLoopScroll() {
      this.scrollRef = document.getElementById('scroller');
      const direction = this.SlideDirection === 'vertical' ? 'scrollTop' : 'scrollLeft';

      const item = this.scrollRef.querySelector('.scrollcard');
      if (!item) return;

      this.itemSize = this.SlideDirection === 'vertical' ? item.offsetHeight : item.offsetWidth;
      this.visibleItems = this.images.length;

      this.scrollRef[direction] = this.itemSize * this.visibleItems;

      this.scrollRef.addEventListener('scroll', () => {
        const scrollPos = this.scrollRef[direction];
        const maxScroll = this.itemSize * this.visibleItems * 2;

        if (scrollPos <= 0) {
          this.scrollRef[direction] = this.itemSize * this.visibleItems;
        } else if (scrollPos >= maxScroll) {
          this.scrollRef[direction] = this.itemSize * this.visibleItems;
        }
      });
    },
    getCardStyle(index) { 
      const sizePercent = 100;
      if (this.SlideDirection === 'vertical') {
        return {
          position: 'absolute',
          top: `${index * (sizePercent*.5)}%`,
          left: '0%',
          width: '100%'
        };
      } else {
        return {
          position: 'absolute',
          top: '0%',
          left: `${index * sizePercent}%`,
          height: '100%'
        };
      }
    },
    onDurationInput(val) {
      const numericValue = parseInt(val.replace(/[^\d]/g, '')) || 0;
      this.transitionDuration = numericValue;
    },
    validateInput() {
      let num = Number(this.sliderWidth);
      if (isNaN(num) || num < 0) {
        num = 0;
      } else if (num > 100) {
        num = 100;
      }
      this.sliderWidth = num.toString();
    },
    updateImages(newImages) {
      this.images = newImages;
    },
    trim(text) {
      return text.substring(5, text.length - 6);
    },
    copyCssCode() {
      navigator.clipboard.writeText(this.trim(this.ContentCss)).then(() => {
          var button = document.getElementById("copy-css-btn");
          button.textContent = "Copied to clipboard ✔";
          setTimeout(function () { button.textContent = "Copy Css"; }, 2000);
      }).catch((err) => { console.error("Could not copy text: ", err); });
    },
    copyCssCodeScroll() {
      navigator.clipboard.writeText(this.trim(this.ContentCssScroll)).then(() => {
          var button = document.getElementById("copy-css-btn");
          button.textContent = "Copied to clipboard ✔";
          setTimeout(function () { button.textContent = "Copy Css"; }, 2000);
      }).catch((err) => { console.error("Could not copy text: ", err); });
    },
    copyJavaScriptCode() {
      navigator.clipboard.writeText(this.trim(this.ContentJavaScript).replace(/\*/g, "")).then(() => {
          var button = document.getElementById("copy-js-btn");
          button.textContent = "Copied to clipboard ✔";
          setTimeout(function () { button.textContent = "Copy JavaScript"; }, 2000);
      }).catch((err) => { console.error("Could not copy text: ", err); });
    },
    copyHtmlCode() {
      navigator.clipboard.writeText(this.trim(this.ContentHtml)).then(() => {
          var button = document.getElementById("copy-html-btn");
          button.textContent = "Copied to clipboard ✔";
          setTimeout(function () { button.textContent = "Copy HTML"; }, 2000);
      }).catch((err) => { console.error("Could not copy text: ", err); });
    },
    copyHtmlCodeScroll() {
      navigator.clipboard.writeText(this.trim(this.ContentHtmlScroll)).then(() => {
          var button = document.getElementById("copy-html-btn");
          button.textContent = "Copied to clipboard ✔";
          setTimeout(function () { button.textContent = "Copy HTML"; }, 2000);
      }).catch((err) => { console.error("Could not copy text: ", err); });
    },
    copyHeadCode() {
      navigator.clipboard.writeText(this.trim(this.ContentHead)).then(() => {
          var button = document.getElementById("copy-head-btn");
          button.textContent = "Copied to clipboard ✔";
          setTimeout(function () { button.textContent = "Copy Head code"; }, 2000);
      }).catch((err) => { console.error("Could not copy text: ", err); });
    },
    importBgImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => { this.background = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
    importScrollerBgImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.scrollerBgFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => { this.scrollerBackground = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
    clearBgImage() {
      this.background = '';
      if (this.bgImageInput) { this.bgImageInput = null; }
    }, 
    clearScrollerBgImage() { 
      this.scrollerBackground = '';
      if (this.bgScrollerImageInput) { this.bgScrollerImageInput = null; }
    }, 
    importBtnImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.btnImg = e.target.result;
          this.btnImgName = file.name;
        };
        reader.readAsDataURL(file);
      }
    },
    realSliderWidth() {
      return this.sliderWidth;
    },
    realSliderHeight() {
      return this.sliderHeight;
    },
    getSwiperNavigation() {
      if (this.buttonVar) {
        return { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" };
      }
      return false;
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
        "--swiper-navigation-size": this.btnWidth / 10 + "vw",
        color: this.btnColor,
        width: "auto",
      };
    },
    getSwiperNavigationRight() {
      if (this.btnType == "image") {
        return {
          transform: `scale(${this.btnWidth / 45})`,
          right: this.offset + "%", 
          backgroundImage: `url('${this.btnImg}')`,
          width: this.btnWidth / 40 + 'vw',
        };
      }
      this.btnImg = null;
      return {
        right: this.offset + "%",
        "--swiper-navigation-size": this.btnWidth / 10 + "vw",
        color: this.btnColor,
        width: "auto",
      };
    },
    getCreativeParams() {
      switch (this.creativeType) {
        case 1: return { prev: { shadow: true, translate: [0, 0, -400] }, next: { translate: ["100%", 0, 0] } };
        case 2: return { prev: { shadow: true, translate: ["-120%", 0, -500] }, next: { shadow: true, translate: ["120%", 0, -500] } };
        case 3: return { prev: { shadow: true, translate: ["-20%", 0, -1] }, next: { translate: ["100%", 0, 0] } };
        case 4: return { prev: { shadow: true, translate: [0, 0, -800], rotate: [180, 0, 0] }, next: { shadow: true, translate: [0, 0, -800], rotate: [-180, 0, 0] } };
        case 5: return { prev: { shadow: true, translate: ["-125%", 0, -800], rotate: [0, 0, -90] }, next: { shadow: true, translate: ["125%", 0, -800], rotate: [0, 0, 90] } };
        case 6: return { prev: { shadow: true, origin: "left center", translate: ["-5%", 0, -200], rotate: [0, 100, 0] }, next: { origin: "right center", translate: ["5%", 0, -200], rotate: [0, -100, 0] } };
      }
    },
    getCubeParams() {
      if (!this.cubeShadow) { return { shadow: false, slideShadows: false }; } 
      else { return { shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }; }
    },
    effectBindings() {
      if (this.effects[this.index] == "creative") { return { creativeEffect: this.getCreativeParams() }; }
      if (this.effects[this.index] == "cube") { return { cubeEffect: this.getCubeParams() }; }
      return null;
    },
    calculateWrapperHeight() {
      const wrapper = document.querySelector(".swiper");
      const parent = document.querySelector(".first");
      if (wrapper && wrapper.parentElement) {
        const wrapperHeight = wrapper.offsetHeight;
        const parentHeight = parent.parentElement.offsetHeight;
        if (parentHeight === 0) return "0%";
        const heightPercentage = (wrapperHeight / parentHeight) * 100;
        return heightPercentage.toFixed(0) + "%";
      }
      return "N/A";  
    },
    exportCode() {
      const wrapperHeight = this.calculateWrapperHeight();
      const scrollerBGFileName = this.scrollerBgFileName;
      const windowHeight = 1080;
      const windowWidth = 1920;
      const paddingScroll = this.padding;
      const top = this.positionTop + "%";
      const left = this.positionLeft + "%";
      const offset = this.offset + "%";
      const btnWidth = this.btnWidth + "vw";

      const scrollwidth = this.sliderWidth + "%";
      const scrollheight = this.sliderHeight + "%";
      const scrollbarwidth = this.scrollwidth + "px"; 
      const scrollcolor = this.scrollColor;
      const scrollhovercolor = this.scrollhoverColor;

      const stylesScroll = `
.scrollable { position: absolute; top: ${top}; left: ${left}; width: ${scrollwidth}; height: ${scrollheight}; background-image: url('assets/${scrollerBGFileName}'); background-size: cover; }
.scrollable #scrollable, #scrollable img { height: 100%; width: 100%; border-style: none; }
.vertical{ overflow: hidden auto; }
.horizontal{ display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; }
.horizontal .scrollcard { display: flex; align-items: center; justify-content: center; scroll-snap-align: start; flex-shrink: 0; }
.horizontal .base { height: 100%; }
.base { line-height: 0; }
.scrollcard { position: relative; margin: ${paddingScroll}rem; } 
.scrollcard:hover .hover { opacity: 1; } 
.hover { position: absolute; top: 0%; left: 0%; line-height: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer; }
#scrollable::-webkit-scrollbar { width: ${scrollbarwidth}; height: ${scrollbarwidth}; } 
#scrollable::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0); } 
#scrollable::-webkit-scrollbar-thumb { background: ${scrollcolor}; } 
#scrollable::-webkit-scrollbar-thumb:hover { background: ${scrollhovercolor}; }
.taparea { position: absolute; display: block; height: 100%; width: 100%; left: 0%; top: 0%; z-index: 10; }
#scrollable, .taparea, .scrollcard { pointer-events: auto; }
.linear { animation-timing-function: linear; }
.ease { animation-timing-function: ease; }
.ease-in { animation-timing-function: ease-in; }
.ease-out { animation-timing-function: ease-out; }
.ease-in-out { animation-timing-function: ease-in-out; } 
.autoloop { overflow: hidden; }  
.vertical .scroll-inner { display: flex; flex-direction: column; }
.horizontal .scroll-inner { display: flex; flex-direction: row; }
.autoloop.vertical .scroll-inner { display: flex; flex-direction: column; animation-name: scrollUp; animation-iteration-count: infinite; }
.autoloop.horizontal .scroll-inner { display: flex; flex-direction: row; animation-name: scrollRight; animation-iteration-count: infinite; }
@keyframes scrollUp { 0% { transform: translateY(0%); } 100% { transform: translateY(-33.33%); } }
@keyframes scrollRight { 0% { transform: translateX(0%); } 100% { transform: translateX(-33.33%); } }
`;

      const styles = `
html, body { text-rendering: auto !important; }
.swiper { line-height: 0; }
.wrapper { height: ${wrapperHeight}; width: ${this.realSliderWidth()}%; position:absolute; top: ${top}; left:${left}; }
.swiper-custom-next, .swiper-custom-prev { background-repeat: no-repeat; background-size: 100%; background-position: center center; }
.swiper-slide gwd-image { display: block; object-fit: cover; }
${this.buttonVar ? `
.swiper-button-next{ top: 50%; right: ${offset}; font-family: Arial, sans-serif; ${this.btnType == "default" ? ` color: ${this.btnColor}; --swiper-navigation-size: ${ this.btnWidth / 10}vw; width: auto;` : `transform: scale(${this.btnWidth / 45}); background-image: url('assets/${this.btnImgName}'); width: ${this.btnWidth / 40}vw;`} }
.swiper-button-prev{ top: 50%; left: ${offset}; font-family: Arial, sans-serif; ${this.btnType == "default" ? ` color: ${this.btnColor}; --swiper-navigation-size: ${ this.btnWidth / 10}vw; width: auto;` : `transform: rotate(180deg) scale(${this.btnWidth / 45}); background-image: url('assets/${this.btnImgName}'); width: ${this.btnWidth / 40}vw;`} }
.swiper-button-next::after{ ${this.btnType == "default" && this.buttonVar ? `--swiper-navigation-size: ${ this.btnWidth / 10}vw;` : `content: ""` } }
.swiper-button-prev::after{ ${this.btnType == "default" && this.buttonVar ? `--swiper-navigation-size: ${ this.btnWidth / 10}vw;` : `content: ""` } } 
` : `` }
.slide-content { position: absolute; width: 100%; top: 0px; left: 0px; height: 100%; transform-style: preserve-3d; }
.max-height{ height: 100%; }
`;

      let swiperSlidesHtml = "";
      this.images.forEach((image, index) => {
        swiperSlidesHtml += `
      <div class="swiper-slide max-height" id="card${index + 1}">
        <div class="max-height" id="slide-wrapper">
          <gwd-image class="slide-content" id="image_${index + 1}" src="assets/${image.name}"></gwd-image>
          <gwd-taparea class="slide-content" id="taparea_${index + 1}"></gwd-taparea>
        </div>
      </div>
      `;
      });
 
      let scrollSlideHtml = '';
      const clonedImages = this.loopScrollVar ? [...this.images, ...this.images, ...this.images] : [...this.images];

      clonedImages.forEach((image, index) => {
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

      const swiperScript = `
    <script* src="https://cdn.jsdelivr.net/npm/swiper@10.3.1/swiper-bundle.min.js"><\/script*>
    <script*>
    var touchStartIndex = null;
    var touchStartTranslate = null;

    function trackGallerySwipe() {
      messageGateway().message({ intent: 'adInteraction', type: 'Click/Swipe', name: 'User Gallery Swipe' });  
    }

  var swiper = new Swiper(".mySwiper", {
    ${ this.type == "scrollable" ? `direction: "horizontal", slidesPerView: "auto", freeMode: true, mousewheel: true,` : "" }
    effect: "${this.effects[this.index]}",
    ${ this.effects[this.index] == "creative" ? "creativeEffect:" + JSON.stringify(this.getCreativeParams()) + "," : "" }
    ${ this.effects[this.index] == "cube" ? "cubeEffect:" + JSON.stringify(this.getCubeParams()) + "," : "" }
    ${ this.autoplayVar ? "autoplay:" + `{ delay: ${this.autoplayDelay}, disableOnInteraction: ${this.autoplayInt}, },` : "" }
    observer: true,
    observeParents: true,
    slidesPerView: ${this.slideCount},
    speed: ${this.transitionDuration},
    breakpoints: {
      200: { spaceBetween: ${Math.floor(this.spaceBetweenSlides / 3)}, },
      400: { spaceBetween: ${Math.floor(this.spaceBetweenSlides / 3)}, },
      640: { spaceBetween: ${this.spaceBetweenSlides}, },
      1024: { spaceBetween: ${this.spaceBetweenSlides}, },
    },
    loop: ${this.loopVar},
    ${ this.buttonVar ? `navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev", },` : "" }
    on: {
      touchStart: function (s) {
        touchStartIndex = s.realIndex; 
        touchStartTranslate = s.getTranslate();  
      },
      touchEnd: function (s) {
        var endIndex = s.realIndex;
        var endTranslate = s.getTranslate();
 
        if (touchStartIndex !== null && endIndex !== touchStartIndex) {
          trackGallerySwipe();
        } else if (touchStartTranslate !== null) { 
          var movedPx = Math.abs(endTranslate - touchStartTranslate);
          if (movedPx >= 10) trackGallerySwipe();  
        }

        touchStartIndex = null;
        touchStartTranslate = null;
      },
      ${ this.buttonVar ? `init: function () {
        document.querySelector('.swiper-button-next').addEventListener('click', function () {
          buttonClicked = true; trackGallerySwipe();
        });
        document.querySelector('.swiper-button-prev').addEventListener('click', function () {
          buttonClicked = true; trackGallerySwipe();
        });
      }` : "" }
    }
  });
<\/script*>

  `;

      const htmlCodeScroll = `
<div id="scrollable" class="scrollable ${this.SlideDirection} ${this.loopScrollVar === true ? 'loop' : '' } ${this.autoAnimate === true ? 'autoloop' : '' }"> 
  <div class="scroll-inner ${this.autoAnimate ? this.selectedEasing : ''}" style="animation-duration: ${this.autoAnimate ? this.slideDuration : 0}s">
    ${scrollSlideHtml} 
  </div>
</div>
      `;

      const htmlCode = `
<div class="wrapper" id="gallery">
  <div class="swiper mySwiper max-height">
    <div class="swiper-wrapper max-height" id="cards">
      ${swiperSlidesHtml}
    </div>
  </div>
  ${this.buttonVar ? ` 
    ${ this.btnType === "image" ? `<div class="swiper-button-next swiper-custom-next" id="arrow-right"></div>` : `<div class="swiper-button-next" id="arrow-right"></div>`}
    ${ this.btnType === "image" ? `<div class="swiper-button-prev swiper-custom-prev" id="arrow-left"></div>` : `<div class="swiper-button-prev" id="arrow-left"></div>`}
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
/* Studio Layout Foundations */
.studio-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0d0d12;
  color: #e4e4e7;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* Inside Default.vue */
.studio-sidebar {
  width: 380px;
  min-width: 380px;
  background-color: #18181f; 
  backdrop-filter: blur(10px); /* Adds a frosted glass effect */
  border-right: 1px solid rgba(255, 255, 255, 0.1); /* Subtle cyan border */
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 10;
}

.sidebar-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: transparent;
}

.sidebar-header h2 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: #a1a1aa;
}

.sidebar-header span {
  color: #ffffff;
  text-transform: capitalize;
  font-weight: 600;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Custom Sleek Scrollbar */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}
.sidebar-content::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background-color: #3f3f46;
  border-radius: 10px;
}
.sidebar-content::-webkit-scrollbar-thumb:hover {
  background-color: #52525b;
}

/* Studio Canvas Area */
.studio-canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #0d0d12;
  background-image: radial-gradient(#272730 1px, transparent 1px);
  background-size: 24px 24px;
}

.canvas-toolbar {
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  pointer-events: none;
}

.canvas-toolbar > * {
  pointer-events: auto;
}

/* Vuetify Overrides for Studio Vibe */
:deep(.v-slider-track__fill) {
  background-color: #00e18c !important;
}
:deep(.v-slider-thumb) {
  color: #00e18c !important;
}
:deep(.v-switch__track) {
  opacity: 0.5;
}

/* Style vuetify inputs for dark theme */
.custom-vuetify-input :deep(.v-field__overlay) {
  background-color: #111116 !important;
}
.custom-vuetify-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
}
.custom-vuetify-input :deep(input) {
  color: #e4e4e7;
}

/* Settings text utilities */
.settings h3 { font-size: 1.1rem; color: #fff; }
.settings h4 { font-size: 0.85rem; color: #a1a1aa; font-weight: 500;}
.border-b { border-bottom: 1px solid #272730; }
.border-t { border-top: 1px solid #272730; }

/* Content Box Restyling */
.content-box {
  background-color: transparent;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 2px dashed #3f3f46;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Artboard Aspect Ratios */
.aspect-16-9 { aspect-ratio: 16/9; width: 70%; max-width: 1000px; }
.aspect-1-1 { aspect-ratio: 1/1; width: 50%; max-width: 600px; }
.aspect-9-16 { aspect-ratio: 9/16; height: 75vh; width: 42vh; }
.shop-ad { aspect-ratio: 9/4; width: 80%; }
.companion-banner { aspect-ratio: 9/2; width: 90%; }

/* Keep specific slider/scroller functionalities intact */
.first {
  position: absolute;
  margin: 0px !important;
}
.scrollable { position: absolute; }
.vertical { overflow-y: scroll; overflow-x: hidden; scroll-behavior: smooth; }
.horizontal { display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; } 
.horizontal .scrollcard { display: flex; align-items: center; justify-content: center; scroll-snap-align: start; flex-shrink: 0; }
#scrollable::-webkit-scrollbar { width: var(--scroll-thumb-width); height: var(--scroll-thumb-width); }
#scrollable::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0); }
#scrollable::-webkit-scrollbar-thumb { background: var(--scroll-thumb-color); }
#scrollable::-webkit-scrollbar-thumb:hover { background: var(--scroll-thumb-color-hover); }
.scrollable #scrollable, #scrollable img { height: 100%; width: 100%; }
.horizontal .base { height: 100%; }
.base { line-height: 0; } 
.hover { position: absolute; top: 0%; left: 0%; line-height: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer; }
.scrollcard { position: relative; }
.scrollcard:hover .hover { opacity: 1; }
gwd-taparea { position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; cursor: pointer; }
.swiper { margin: 0; line-height: 0; }
.swiper-slide { width: 100%; height: 100%; }
.swiper-slide img { width: 100%; height: 100%; }

/* Modal specific code block fixes */
.codeBlock {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 50px;
  text-wrap: wrap;
  font-size: .75rem;
  background-color: #111116;
  color: #a1a1aa;
  padding: 1rem;
  border-radius: 8px;
}
.codeCopy { background-color: #18181f; position: relative; } 
.copy-btn { position: absolute; bottom: 4.5%; left: 5%; color: #00e18c !important; }

/* Keep keyframes */
.autoloop.vertical .scroll-inner { display: flex; flex-direction: column; animation-name: scrollUp; animation-iteration-count: infinite; }
.autoloop.horizontal .scroll-inner { display: flex; flex-direction: row; animation-name: scrollRight; animation-iteration-count: infinite; }
@keyframes scrollUp { 0% { transform: translateY(0%); } 100% { transform: translateY(-33.33%); } }
@keyframes scrollRight { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
.v-field__field { 
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
}
</style>