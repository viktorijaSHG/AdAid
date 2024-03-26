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
            images: []
        };
    },
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
            this.$emit('images-updated', this.images);
        },
    deleteImage(index){
      this.images.splice(index,1);
    },
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
