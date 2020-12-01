<template>
    <router-view />
    <LayerModalUi></LayerModalUi>
</template>

<script>
import { reactive, defineComponent } from "vue";
import LayerModalUi from "@/components/modalUi/layerModalUi.vue";

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
