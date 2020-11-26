<template>
    <div class="summary-layer" :data-level="level">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name:"summaryLayer",
    props: {
        level: {
            type: Number,
            required: true,
        },
    },
});
</script>
<style lang="scss">
.summary-layer {
    position: relative;

    &[data-level="1"] {
    }

    &[data-level="2"] {
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    &[data-level="3"] {
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 10px;

    }
}
</style>
