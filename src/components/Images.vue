<template>
    <div class="card">
      <div class="custom-file-input">
        <label for="fileInput" class="custom-file-label">Choose files</label>
        <input
          type="file"
          id="fileInput"
          ref="fileInput"
          @change="importImages"
          multiple
          style="display: none;"
        />
      </div>
      <h3 class="pb-2">Media Library</h3>
      <div class="img-container" ref="imgContainer" ghost-class="ghost" handle=".drag">
        <div
          class="image"
          v-for="(image, index) in images"
          :key="image.id"
          :id="index+1"
        >
          <div class="preview-container">
            <img src="../assets/menu.svg" class="drag"/> 
            <img :src="image.url" draggable="false" class="photo" />
            <div id="name" class="filename">{{ image.name }}</div>
          </div>
          <div class="actions">
            <img v-if="type == 'scrollable'" src="../assets/effect.svg" class="remove"/> 
            <img src="../assets/bin.svg" class="remove" @click="deleteImage(index)"/>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import Sortable from 'sortablejs';

export default {
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      images: []
    };
  },
  emits: ['imagesUpdated'],
  mounted() {
    this.initSortable();
    if (this.type === 'scrollable') {
      // console.log('Type is scrollable!');
    }
  },
  methods: {
    importImages(event) {
      const files = Array.from(event.target.files);
      const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name)); // Optional: prevent Safari randomness

      sortedFiles.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({
            id: Date.now() + i, // Unique ID
            url: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      });

      // Emit updated images after load (optional, better after drag end)
      setTimeout(() => {
        this.$emit('imagesUpdated', this.images);
      }, 500);
    },
    deleteImage(index) {
      this.images.splice(index, 1);
      this.$emit('imagesUpdated', this.images);
    },
    initSortable() {
      const el = this.$refs.imgContainer;

      Sortable.create(el, {
        animation: 150,
        fallbackOnBody: true,
        forceFallback: true,
        onEnd: (evt) => {
            const movedItem = this.images.splice(evt.oldIndex, 1)[0];
            this.images.splice(evt.newIndex, 0, movedItem);
            this.$emit('imagesUpdated', this.images);
        } 
        });
    }
  }
};
</script>


<style>

.actions {
  display: flex;
  gap: .75rem;
}
.filename {
  font-size: .6rem;
  padding-left: .5rem;
  padding-right: 1rem;
  opacity: 0.7; 
}
.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-height: 80px;
  height: 100%;
}
.drag {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
.img-container { 
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
  padding: 0rem 1rem;
  user-select: none;
}
.image .photo {
  pointer-events: none;
  -webkit-user-drag: none;
}
.image {
  cursor: move;
}

 .card{
  width: 100%;
  padding: 10px;
  margin: 10px;
 background-color: #0b3144;
 }
 .card .top{
  text-align: center;
 }
 
 .card button{
  outline: 0;

 }
 .card .drag-area{
  height: 150px;
  border-radius: 5px;
  border: 2px dashed  #2b4d5e;
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


.card .img-container .image .photo{
  width: 100px;
 
  border-radius: 5px;
}

 

 
 .swiper-slide .photo {
  width: 100%;
  height: 100%;
 }

.content-box{
  align-items: center;
  justify-content: center;
  margin: auto
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
  background-color: #0b3144; /* Light grey background */
 }
 
 .card .select {
  color: #007bff; /* Bootstrap primary color */
  margin-left: 5px;
  cursor: pointer;
 }
 
 .card .img-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 360px;
  overflow-y: auto; /* Enable scrolling if content overflows */ 
  padding: 1rem;
  border-radius: 6px;
  background-color: #0c2b3b;
 }
 
 .card .img-container .image {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  max-height: 60px;
  /* height: 100%; */
  /* margin: 10px; */
  position: relative;
 }
 
 .card .img-container .image .photo {
  width: auto;
  height: 100%;
  object-fit: cover; /* Ensure images cover the area without stretching */
  border-radius: 5px;
 }
 
 .card .img-container .image .delete {
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

 
.card{
  width: 100%;
  padding: 10px;
  margin: 10px;
 
 }
 .card .top{
  text-align: center;
 }

 .card button{
  outline: 0;

 }
 .card .drag-area{
  height: 150px;
  border-radius: 5px;
  border: 2px dashed  #0b3144;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  margin-top: 10px;
 }

.card .img-container .image img{
  width: auto;
 
  border-radius: 5px;
}

.remove {
  width: 2.3rem !important;
  padding: .5rem;
  border: #ffffff6e solid 1px;
  cursor: pointer;
}



.image {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.image:hover {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}
.image:active  {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}

.custom-file-input {
    margin: 30px 0;
 position: relative;
 display: inline-block;
 cursor: pointer;
 margin-left: 40%;

}

.custom-file-label {
    padding: 14px 16px;

 color: white;
 border-radius: 4px;
 cursor: pointer;
 background-color: #00e18c;
 color: #2b4d5e;
}

/* Hide the default file input */
input[type="file"] {
 display: none;
}

.img-container::-webkit-scrollbar {
  width: 3px;   /* vertical scrollbar thickness */
  height: 3px;  /* horizontal scrollbar thickness */
}

.img-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

.img-container::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.7);
}

.img-container::-webkit-scrollbar-thumb:hover {
  background: rgb(85, 85, 85);
}

</style>
