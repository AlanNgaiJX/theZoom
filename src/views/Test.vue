<template>
    <div id="Test">
        <Clock></Clock>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Clock from "@/components/clock/clock.vue";

export default defineComponent({
    name: "Test",
    components: {
        Clock
    },
});
</script>

<style lang="scss">
#Test {
}
</style>
