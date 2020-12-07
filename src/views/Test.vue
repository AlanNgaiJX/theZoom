<template>
    <div id="Test">
        <Clock></Clock>
        <!-- <button @click="pauseCountdown">test</button> -->
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
    setup() {
        return {
        }
    },
});
</script>

<style lang="scss">
#Test {
}
</style>
