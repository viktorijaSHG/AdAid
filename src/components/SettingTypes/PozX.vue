<template>
    <div>
        <label>
            <input type="text" v-model="sliderHeight" /> Slide Height
        </label>
        <label>
            <input type="text" v-model="sliderWidth" /> Slider Width
        </label>
        <label>
            <input type="text" v-model="positionTop" /> Y Position
        </label>
        <label>
            <input type="text" v-model="positionLeft" /> X Position
        </label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sliderHeight: '',
            sliderWidth: '',
            positionTop: '',
            positionLeft: ''
        };
    },
    computed: {
        formData() {
            return {
                sliderHeight: this.sliderHeight,
                sliderWidth: this.sliderWidth,
                positionTop: this.positionTop,
                positionLeft: this.positionLeft
            };
        }
    }
};
</script>