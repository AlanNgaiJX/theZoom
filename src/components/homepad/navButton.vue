<template>
    <div id="navButton" @click="attachBgBlur">
        <SvgIcon name="app" color="#ffffff" class="icon-navButton"></SvgIcon>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    components: {
        SvgIcon,
    },
    setup() {
        const store = useStore();
        function attachBgBlur() {
            store.commit("layout/setState", { showBlurBg: true });
        }
        return { attachBgBlur };
    },
});
</script>

<style lang="scss">
#navButton {
    width: 80px;
    height: 80px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.849);
    transition: box-shadow 0.2s;
    background-color: rgba(0, 0, 0, 0.1);

    &:hover {
        box-shadow: 0 2px 27px 6px rgba(245, 245, 245, 0.849);
    }

    .icon-navButton {
        transform: rotateY(0) rotateZ(0) scale(1);
        transition: transform 0.8s;
        width: 35px;
        height: 35px;
    }

    &:hover {
        .icon-navButton {
            transform: rotateY(180deg) rotateZ(360deg) scale(1.3);
        }
    }
}
</style>
