<template>
    <div id="loading" v-if="loading.state">
        <ShadowShade v-if="showShade" :opacity="shadeOpacity"></ShadowShade>
        <div class="spinWrap">
            <SpinKit
                :type="loading.type"
                :size="loading.size"
                :speed="loading.speed"
                :color="loading.color"
            ></SpinKit>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { LoadingData } from "./loading_type";
import SpinKit from "./spinKit.vue";
import ShadowShade from "../shadowShade/shadowShade.vue";

export default defineComponent({
    name: "loading",
    components: {
        SpinKit,
        ShadowShade,
    },
    props: {
        loading: {
            type: Object as PropType<LoadingData>,
            required: true,
        },
    },
    setup(props) {
        const loadingData = computed(() => {
            return props.loading;
        });

        const showShade = computed(() => {
            return loadingData.value.shade !== false;
        });

        const shadeOpacity = computed(() => {
            return typeof loadingData.value.shade === "boolean"
                ? loadingData.value.shade
                    ? 0.5
                    : 0
                : loadingData.value.shade;
        });

        return {showShade, shadeOpacity}
    },
});
</script>

<style lang="scss">
#loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .spinWrap {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
