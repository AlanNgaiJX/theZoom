<template>
    <div id="toast">
        <p v-html="toastData.title"></p>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType,
    computed,
    watch,
    ref,
    onMounted,
    onUnmounted,
    nextTick,
} from "vue";
import { ToastData } from "@/components/toast/toast_type.ts";
import { modalUi } from "@/unit/modelUiUnit.ts";

export default defineComponent({
    name: "toast",
    props: {
        toast: {
            type: Object as PropType<ToastData>,
            required: true,
        }
    },
    setup(props, context) {
        const toastData = computed(() => {
            return props.toast;
        });

        onMounted(function() {
            const id = toastData.value.id;
            const timer = setTimeout(function() {
                modalUi.hideToast(id);
                clearTimeout(timer);
            }, toastData.value.duration);
        });

        return { toastData };
    },
});
</script>

<style lang="scss">
#toast {
    min-width: 100px;
    max-width: 100%;
    min-height:50px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;

    p{
        word-break:break-all;
    }
}
</style>
