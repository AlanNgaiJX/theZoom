<template>
    <div
        id="background"
        :class="showBlurBg ? 'blur' : 'clean'"
        @click="onClickBg"
    ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    name: "background",
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
#background {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("~@/assets/images/bg/Photo by Corey Agopian (rdy-mAeok9c).jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s;
    transform-origin: center;

    &.clean {
        z-index: 1;
        filter: blur(0);
        transform: scale(1);
    }

    &.blur {
        z-index: 98;
        filter: blur(10px);
        transform: scale(1.3);
    }
}
</style>
