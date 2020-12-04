<template>
    <div
        id="blurBackground"
        :class="showBlurBg ? 'blur' : 'invisible'"
        @click="onClickBg"
    ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    name: "blurBackground",
    setup() {
        const store = useStore();
        const showBlurBg = computed(() => {
            return store.state.layout.showBlurBg;
        });

        function onClickBg() {
            if (showBlurBg.value) {
                store.commit("layout/setState", { showBlurBg: false });
            }
        }
        return { showBlurBg, onClickBg };
    },
});
</script>

<style lang="scss">
#blurBackground {
    position: fixed;
    width: 100%;
    height: 100%;
    // background-image: url("~@/assets/images/bg/Photo by Corey Agopian (rdy-mAeok9c).jpg");
    background-image: url("~@/assets/images/bg/Photo by Dan-Cristian Pădureț (Y5dd6hLkn-8).jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.3s;
    transform-origin: center;
    z-index: 98;

    button {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        pointer-events: auto;
    }

    &.invisible {
        filter: blur(0);
        transform: scale(1.3);
        pointer-events: none;
        opacity: 0;
    }

    &.blur {
        filter: blur(10px) brightness(50%);
        transform: scale(1);
        pointer-events: auto;
        opacity: 1;
    }
}
</style>
