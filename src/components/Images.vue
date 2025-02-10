<template>
    <div class="card">

        <div class="custom-file-input">
            <label for="fileInput" class="custom-file-label">Choose files</label>
            <input type="file" id="fileInput" ref="fileInput" @change="importImages" multiple style="display: none;" />
        </div>
        <div class="img-container">
          <div class="image" v-for="(image, index) in images" :key="index">
            <span class="delete" @click="deleteImage(index)">&times;</span>
            <img :src="image.url"/>
          </div>
        </div>
     </div>


</template>

<script>
export default {
    data() {
        return {
            images: [] // Initialize the images array
        };
    },
    emits: ['imagesUpdated'],
    methods: {
        importImages(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.images.push({
                        id: i,
                        url: e.target.result,
                        name: files[i].name
                    });
                };
                reader.readAsDataURL(files[i]);
            }
            this.$emit('imagesUpdated', this.images);
        },
        deleteImage(index){
            this.images.splice(index,1);
        },
    }
};
</script>


<style>


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


.card .img-container .image img{
  width: 100px;
 
  border-radius: 5px;
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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 200px;
  overflow-y: auto; /* Enable scrolling if content overflows */
 }
 
 .card .img-container .image {
  width: 100px;
  height: 100%;
  margin: 10px;
  position: relative;
 }
 
 .card .img-container .image img {
  width: 100%;
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
  width: 100px;
 
  border-radius: 5px;
}




.image {
    width: 200px;
    height: 200px;
    object-fit: cover;
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


</style>
