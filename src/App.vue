<template>
    <div id="nav"></div>
    <!-- <div class="markdown-body" v-html="state.content"></div> -->
    <router-view />
    <LayerModalUi></LayerModalUi>
</template>

<script>
import { reactive, ref, watch, defineComponent } from "vue";
import LayerModalUi from "@/components/layerModalUi.vue";

export default defineComponent({
    components: { LayerModalUi },
    setup() {
        const state = reactive({});
        return { state };
    },
});
</script>

<style lang="scss">
#app {
}
</style>
