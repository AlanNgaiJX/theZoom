<template>
    <router-view />
    <LayerModalUi></LayerModalUi>
</template>

<script>
import { reactive, defineComponent, onMounted } from "vue";
import { initNotification } from "@/unit/commonUtils";
import LayerModalUi from "@/components/modalUi/layerModalUi.vue";
import favicon from "@/assets/images/icon/pngIcon/favicon.png";

export default defineComponent({
    components: { LayerModalUi },
    setup() {
        const state = reactive({});
        onMounted(() => {
            initNotification({
                duration: 5000,
                icon: favicon,
            });
        });
        return { state };
    },
});
</script>

<style lang="scss">
#app {
}
</style>
