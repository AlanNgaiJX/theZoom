<template>
    <div id="layerModalUi">
        <!-- 模态框 -->
        <ModalList :modalList="modalList"></ModalList>
        <ToastList :toastList="toastList"></ToastList>
        <Loading :loading="loading"></Loading>
    </div>
</template>

<script>
import { computed, watch } from 'vue';
import { modalUi } from "@/unit/modelUiUnit.ts";
import ToastList from "@/components/toastList/toastList.vue";
import ModalList from "@/components/modalList/modalList";
import Loading from "@/components/loading/loading.vue"

export default {
    name: "layerModalUi",
    components: {
        ToastList,
        ModalList,
        Loading
    },
    setup() {
        const modalList = modalUi.modalList;
        const toastList = modalUi.toastList;
        const loading = modalUi.loading;
        return { toastList, modalList, loading};
    },
};
</script>

<style lang="scss">
#layerModalUi {
    position: fixed;
    z-index: 999;
}
</style>
