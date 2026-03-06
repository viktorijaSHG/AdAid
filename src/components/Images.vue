<template>
  <div class="card">
    <div class="panel pt-4 pb-4">
      <h3>Media Library</h3>
      <div class="custom-file-input">
        <v-btn @click="$refs.fileInput.click()" size="small" variant="flat" class="custom-file-label no-uppercase">Select Image</v-btn>
        <input
          type="file"
          id="fileInput"
          ref="fileInput"
          @change="importImages"
          multiple
          style="display: none;"
        />
      </div>
    </div>

    <div class="img-container py-1" ref="imgContainer" ghost-class="ghost" handle=".drag">
      <div
        class="image"
        v-for="(image, index) in images"
        :key="image.id"
        :id="index + 1"
      >
        <div class="preview-container">
          <v-icon class="drag" size="small">mdi-drag-vertical</v-icon>
          <v-avatar rounded="sm" size="36">
            <img :src="image.url" class="photo" />
          </v-avatar>
          <div id="name" class="filename">{{ image.name }}</div>
        </div>
        <div class="actions">
          <v-icon v-if="type == 'scroller'" size="small" class="remove" @click="openDialog(image)">mdi-image-edit-outline</v-icon>
          <v-icon size="small" class="remove" @click="deleteImage(index)">mdi-delete-outline</v-icon>
        </div>
      </div>
    </div>
  </div>

  <v-dialog v-model="showDialog" max-width="600px">
    <v-card class="px-6 pb-8 pt-6 rounded-lg bg-grey-darken-4">
      <v-row>
        <v-col cols="12">
          <h3 class="px-0 pb-3 text-center text-white">Add Hover Image</h3>
          <v-img
            :src="hovering ? (selectedHoverImage?.url || selectedImage?.hoverUrl || selectedImage?.url) : selectedImage?.url"
            contain
            color="#18181f"
            class="rounded-lg position-relative"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            style="min-height: 450px;max-height: 450px;cursor: pointer; border: 1px dashed #3f3f46;"
          >
            <v-icon icon="mdi-check-circle" color="success" size="x-large" style="position: absolute; top: 1.6%; right: 1.6%;" v-if="selectedHoverImage"></v-icon>
          </v-img>
        </v-col>
        
        <v-col cols="12" class="d-flex text-center justify-center align-center ga-4">
          <div class="custom-file-input">
            <v-btn @click="$refs.fileHover.click()" variant="outlined" color="#e4e4e7" class="no-uppercase">Select Hover Image</v-btn>
            <input
              type="file"
              id="fileHover"
              ref="fileHover"
              @change="importImages"
              style="display: none;"
            />
          </div> 
          <v-btn @click="removeHoverImage" append-icon="mdi-close" color="#ef4444" variant="tonal" v-if="selectedHoverImage">Clear hover image</v-btn> 
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
    openDialog(image) {
      this.selectedImage = image;
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

<style scoped>
.card {
  width: 100%;
  background-color: transparent;
  color: #e4e4e7;
  margin-bottom: 2rem;
  padding: 0rem 1rem;
}

.panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #272730;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.panel h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #ffffff;
}

.custom-file-label, :deep(.v-btn) {
  background-color: #272730 !important;
  color: #ffffff !important;
  text-transform: none;
  border: 1px solid #3f3f46;
  border-radius: 6px;
}

.img-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
/* Inside Images.vue */
.image {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(2, 6, 14, 0.5); /* Darker, slightly transparent navy */
  border: 1px solid rgba(0, 242, 195, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  transition: border-color 0.2s;
  cursor: grab;
}

.image:hover {
  border-color: #4f46e5;
}

.image:active {
  cursor: grabbing;
}

.preview-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.drag {
  color: #71717a;
  cursor: inherit;
}

.filename {
  font-size: 0.75rem;
  color: #a1a1aa;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.remove {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.25rem;
  background-color: #272730;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  color: #a1a1aa;
}

.remove:hover {
  background-color: #ef4444;
  color: #ffffff;
}

.sortable-ghost {
  opacity: 0.3;
  background-color: #272730;
}
.sortable-chosen {
  border: 1px dashed #4f46e5;
}
</style>