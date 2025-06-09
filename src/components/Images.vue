<template>
  <div class="card">

    <v-row class="panel pt-4 pb-4">
      <v-col cols="auto"><h3>Media Library</h3></v-col>
      <v-col cols="auto">
        <div class="custom-file-input">
          <v-btn @click="$refs.fileInput.click()" size="small" variant="tonal" class="no-uppercase">Select Image</v-btn>
          <input
            type="file"
            id="fileInput"
            ref="fileInput"
            @change="importImages"
            multiple
            style="display: none;"
          />
        </div>
      </v-col>
    </v-row>




    <div class="img-container py-1 px-3" ref="imgContainer" ghost-class="ghost" handle=".drag">

      
      <div
        class="image"
        v-for="(image, index) in images"
        :key="image.id"
        :id="index + 1"
      >
        <div class="preview-container">
          <v-icon class="drag" size="small" style="cursor: grab;">mdi-drag-vertical</v-icon>
          <v-avatar rounded="sm">
            <img :src="image.url" class="photo" />
          </v-avatar>
          <div id="name" class="filename">{{ image.name }}</div>
        </div>
        <div class="actions">
          <img v-if="type == 'scrollable'" src="../assets/effect.svg" class="remove" @click="openDialog(image)" />
          <img src="../assets/bin.svg" class="remove" @click="deleteImage(index)" />
        </div>
      </div>
 
    </div>
  </div>

  <v-dialog v-model="showDialog" max-width="600px">
    <v-card class="px-6 pb-8 pt-6 rounded-lg">
    <v-row>
      <v-col cols="12">

        <h3 class="px-0 pb-3 text-center">Add Hover Image</h3>
          <v-img
            :src="hovering ? (selectedHoverImage?.url || selectedImage?.hoverUrl || selectedImage?.url) : selectedImage?.url"
            contain
            color="#f3f5f7"
            class="rounded-lg position-relative"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            style="min-height: 450px;max-height: 450px;cursor: pointer; border: 1px dashed #e9e9ea;"
          > <v-icon icon="mdi-check-circle" color="success" size="x-large" style="position: absolute; top: 1.6%; right: 1.6%;" v-if="selectedHoverImage"></v-icon>
        </v-img>
      </v-col>
      
    
      <v-col cols="12" class="d-flex text-center justify-center align-center ga-4">
        
        <div class="custom-file-input">
          <v-btn @click="$refs.fileHover.click()" variant="outlined" class="no-uppercase">Select Hover Image</v-btn>
          <input
            type="file"
            id="fileHover"
            ref="fileHover"
            @change="importImages"
            style="display: none;"
          />
        </div> 
         <v-btn @click="removeHoverImage" append-icon="mdi-close" color="#000000" v-if="selectedHoverImage">Clear hover image</v-btn> 
      </v-col>
       
    </v-row>
    </v-card>
     
  </v-dialog>
</template>

<script>
import Sortable from "sortablejs";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      images: [],
      Hoverimages: [],
      showDialog: false,
      selectedImage: null,
      selectedHoverImage: null,
      hovering: false,
    };
  },
  emits: ["imagesUpdated"],
  mounted() {
    this.initSortable();
  },
  methods: {
    removeHoverImage() {
      if (this.selectedImage) {
        this.selectedImage.hoverUrl = null;
        this.selectedImage.hoverName = null;
      }
      this.selectedHoverImage = null;
    },
    removeHoverImage() {
      if (this.selectedImage) {
        this.selectedImage.hoverUrl = null;
        this.selectedImage.hoverName = null;
      }
      this.selectedHoverImage = null;
    },
    openDialog(image) {
      this.selectedImage = image;
      // Load hover image from the image object if exists
      this.selectedHoverImage = image.hoverUrl
        ? { url: image.hoverUrl, name: "Hover Image" }
        : null;
      this.showDialog = true;
    },
    importImages(event) {
      const files = Array.from(event.target.files);
      const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
      const isHover = event.target.id === "fileHover";

      sortedFiles.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = {
            id: Date.now() + i,
            url: e.target.result,
            name: file.name,
          };

          if (isHover) {
            this.selectedHoverImage = imageData;
            if (this.selectedImage) {
              this.selectedImage.hoverUrl = imageData.url;
              this.selectedImage.hoverName = imageData.name;
            }
          } else {
            this.images.push(imageData);
          }
        };
        reader.readAsDataURL(file);
      });

      // Reset the input to upload same file again
      event.target.value = null;

      if (!isHover) {
        setTimeout(() => {
          this.$emit("imagesUpdated", this.images);
        }, 500);
      }
    },
 
    deleteImage(index) {
      this.images.splice(index, 1);
      this.$emit("imagesUpdated", this.images);
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
          this.$emit("imagesUpdated", this.images);
        },
      });
    },
  },
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
  min-height: 70px;
  display: flex;
  flex-wrap: wrap;
  gap: .3rem; 
  padding: 0rem 1rem;
  user-select: none;
}
.image .photo {
  /* pointer-events: none;
  -webkit-user-drag: none; */
}
.image {
  cursor: move;
}

 .card{
  width: 100%;
  padding: 0;
  margin: 0;
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
  border: 4px dashed  #2b4d5e;
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
  justify-content: center;
  align-items: center;
  /* max-height: 360px; */
  /* overflow-y: auto;  */
  /* padding: 1rem; */
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
  width: 2rem !important;
  padding: .4rem;
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
    /* margin: 30px 0;
 position: relative;
 display: inline-block;
 cursor: pointer;
 margin-left: 40%; */

}

.custom-file-label {
  padding: .2rem; 
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
.no-uppercase {
  text-transform: none;
}
.sortable-ghost {
  opacity: 0.4;
  transform: scale(0.98);
}

.sortable-chosen {
  border: 2px dashed #2196f3;
}

.drag {
  cursor: grab;
}
</style>
