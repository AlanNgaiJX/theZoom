<template>
    <div id="Home">
        <NavHead index="2"></NavHead>
        <!-- <Background index="1,99"></Background> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import NavHead from "@/components/navHead.vue";
import Background from "@/components/background.vue";

export default defineComponent({
    name: "Home",
    components: {
        NavHead,
        Background,
    },
    setup(props, context) {
        const state = reactive({});

        return {
            state
        };
    },
});
</script>

<style lang="scss">
#Home {
    .testBtn {
        position: fixed;
        left: 300px;
        top: 500px;
    }
}
</style>
