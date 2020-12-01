<template>
    <div id="Test">
        <input type="text" @input="handleInput" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { throttle } from "@/unit/commonUtils";

export default defineComponent({
    name: "Test",
    components: {},
    data() {
        return {};
    },
    methods: {
        handleInput: throttle(function(){
            console.log("t");
        },1000)
    },
});
</script>

<style lang="scss">
#Test {
}
</style>
