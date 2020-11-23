<template>
    <div id="toastList">
        <div class="rows-wrap">
            <transition-group
                enter-active-class="animate__animated animate__fadeInUp animate__faster"
                leave-active-class="animate__animated animate__fadeOutUp animate__faster"
                mode="out-in"
            >
                <div
                    class="toast-wrap"
                    v-for="toast in toastList"
                    :key="toast.id"
                >
                    <Toast :toast="toast"></Toast>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import Toast from "@/components/toast/toast.vue";

export default defineComponent({
    name: "toastList",
    components: {
        Toast,
    },
    props: {
        toastList: {
            type: Array,
        },
    },
});
</script>

<style lang="scss">
#toastList {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 30% 70%;
    pointer-events: none;

    .rows-wrap {
        grid-column-start: 2;
        grid-row-start: 2;
        justify-self: center;
        
        .toast-wrap {
            display: flex;
            justify-content: center;
            max-width: 350px;
        }
    }
}
</style>
