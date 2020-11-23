<template>
    <div id="modalList">
        <div v-for="modal in modalList" :key="modal.id" class="modalItem">
            <Modal :modal="modal"></Modal>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/modal.vue";

export default defineComponent({
    name: "modalList",
    components: {
        Modal,
    },
    props: {
        modalList: {
            type: Array,
            required: true,
        },
    },
});
</script>