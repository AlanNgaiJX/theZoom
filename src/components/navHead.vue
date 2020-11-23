<template>
    <div id="navHead">
        <div class="navButton" @click="attachAppPannel">
            <div class="icon">
                <SvgIcon name="app" color="#ffffff" size="16"></SvgIcon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import SvgIcon from "@/components/svgIcon.vue";
import { useStore } from "vuex";

export default {
    name: "navHead",
    components: {
        SvgIcon,
    },
    setup() {
        const store = useStore();
        function attachAppPannel() {
            store.commit("layout/setState", { showBlurBg: true });
        }
        return { attachAppPannel };
    },
};
</script>

<style lang="scss">
#navHead {
    position: fixed;
    z-index: 2;

    .navButton {
        width: 30px;
        height: 30px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &::before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000000;
            opacity: 0.1;
        }

        .icon {
            position: absolute;
            transform: rotateY(0) rotateZ(0) scale(1);
            transition: transform 0.5s;
        }

        &:hover {
            .icon {
                transform: rotateY(180deg) rotateZ(360deg) scale(1.3);
            }
        }
    }
}
</style>
