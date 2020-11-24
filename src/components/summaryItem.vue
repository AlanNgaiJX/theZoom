<template>
    <div id="summaryItem">
        {{ content }}
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "summaryItem",
    props: {
        content: {
            type: String,
        },
        itemData: {
            type: Object,
        },
    },
});
</script>
