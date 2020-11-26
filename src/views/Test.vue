<template>
    <div id="Test">
        <button @click="play">play</button>
        <div class="redBall" ref="redBall"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gsap } from "gsap";

export default defineComponent({
    name: "Test",
    components: {},
    data() {
        return {};
    },
    methods: {
        play() {
            // const target = this.$refs["redBall"] as HTMLElement;
            // if (target) {
            //     gsap.to(target, {
            //         x: 800,
            //         scale:1.5
            //     });
            // }

            const obj = {
                y: 0
            }
            gsap.to(obj,{
                duration:5,
                y:1000,
                onUpdate(){
                    console.log(obj.y);
                }
            })
        },
    }
});
</script>

<style lang="scss">
#Test {
    .redBall {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50%;
    }
}
</style>
