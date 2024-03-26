<template>
   <div class="settings">
        
    <label>
          <input type="text" v-model="sliderHeight" /> slide heigth
        </label>
        <label>
          <input type="text" v-model="sliderWidth" /> slider width
        </label>
        <label>
          <input type="text" v-model="positionTop" /> Y position
        </label>
        <label>
          <input type="text" v-model="positionLeft" /> X position
        </label>

        <label>
          <input type="checkbox" v-model="loopVar"> Enable Loop
        </label>
        <label >
          <input type="text" v-model="slideCount" /> Slidesper view
        </label>
        <label  >
          <input type="text" v-model="spaceBetweenSlides" /> Space between slides
        </label>
        <label>
          <input type="text" v-model="offset" /> Button offset
        </label>
        <label>
          <input type="checkbox" v-model="buttonVar"> Side buttons
        </label>
        <label>
          <input type="checkbox" v-model="freemodeVar"> Freemode
        </label>
        <label>
          <select v-model="directionVar">
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
           </select>Direction
           
        
        </label>
        
      


        <div class="drag-area">
          <span class="select" role="button" @click="selectFiles">
          </span>select background image
          <input name="file" type="file" class="file" ref="fileInput" @change="onBackgroundSelect"/>
        </div>
       
         <button @click="exportCode">Export Code</button>
      </div>
</template>

<script>
export default {
    data() {
        return {
            images: []
        };
    },
    methods: {
        
    }
};
</script>

<style scoped>

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


.file-insert {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.image-container {
    margin: 10px;
}

.image {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>
