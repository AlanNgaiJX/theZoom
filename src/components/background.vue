<template>
    <div id="background"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    name: "background",
});
</script>

<style lang="scss">
#background {
    position: fixed;
    width: 100%;
    height: 100%;
    // background-image: url("~@/assets/images/bg/Photo by Corey Agopian (rdy-mAeok9c).jpg");
    background-image: url("~@/assets/images/bg/Photo by Dan-Cristian Pădureț (Y5dd6hLkn-8).jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s;
    transform-origin: center;
}
</style>
