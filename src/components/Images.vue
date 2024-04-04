<template>
    <div class="card">
        <div class="drag-area">
            <input type="file" ref="fileInput" @change="importImages" multiple>
        </div>
        <div class="container">
          <div class="image" v-for="(image, index) in images" :key="index">
            <span class="delete" @click="deleteImage(index)">&times;</span>
            <img :src="image.url"/>
          </div>
        </div>
     </div>

    <div class="file-insert">
        
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
                        url: e.target.result
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


<style scoped>

.first {
  display: flex; /* Make .first a flex container */
  justify-content: center; /* Center children horizontally */
  align-items: center; /* Center children vertically */
  height: 100%; /* Ensure .first takes up the full height of its parent */
  position: relative; /* Keep this if you need to position children absolutely */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 }

 
 .swiper-button-next {
     right: 10px;
 }
 
 .swiper-button-prev {
     left: 10px;
 }

 .swiper{
  margin-top: auto;
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
  width: 1280px;
  height: 720px;
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
