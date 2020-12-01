<template>
    <div id="layerModalUi">
        <!-- 模态框 -->
        <ModalList :modalList="modalList"></ModalList>
        <ToastList :toastList="toastList"></ToastList>
        <Loading :loading="loading"></Loading>
    </div>
</template>

<script>
import { modalUi } from "./modelUiUnit.ts";
import ToastList from "./toastList/toastList.vue";
import ModalList from "./modalList/modalList";
import Loading from "./loading/loading.vue"

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
