<template>
    <div>
        <label>
            <input type="text" v-model="positionY" /> Y Position
        </label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            positionY: ''
        };
    },
    computed: {
        formData() {
            return {
                positionY: this.positionY
            };
        }
    }
};
</script>