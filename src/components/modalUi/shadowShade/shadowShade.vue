<template>
    <div id="shadowShade" class="fadeInVeryFast" :style="shadeStyle"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
    name: "shadowShade",
    props: {
        opacity: {
            type: Number,
            default: 0.5,
        },
    },
    setup(props) {
        const shadeStyle = computed(() => {
            return {
                "background-color": `rgba(0, 0, 0, ${props.opacity})`,
            };
        });

        return { shadeStyle };
    },
});
</script>

<style lang="scss">
@keyframes fadeInVeryFast {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
#shadowShade {
    display: block;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: auto;
}
.fadeInVeryFast {
    animation-name: fadeInVeryFast;
    animation-duration: 0.2s;
}
</style>
