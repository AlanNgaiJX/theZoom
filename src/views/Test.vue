<template>
    <div id="Test">
        <Clock></Clock>
        <!-- <div>{{ v }}</div> -->
        <!-- <div class="wrap">
            <Slider v-model:value="v" :step="0.09"></Slider>
        </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Clock from "@/components/clock/clock.vue";
import Slider from "@/components/formUi/slider.vue";

export default defineComponent({
    name: "Test",
    components: {
        Clock,
        Slider,
    },
    data() {
        return {
            v: 0,
        };
    },
});
</script>

<style lang="scss">
#Test {
    // .wrap{
    //     width: 200px;
    //     margin: 50px;
    // }
}
</style>
