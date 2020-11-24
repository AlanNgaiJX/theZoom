<template>
    <div id="Test">
        <SummaryList :list="list"></SummaryList>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SummaryList from "@/components/summaryList.vue";

export default defineComponent({
    name: "Test",
    components: {
        SummaryList,
    },
    data() {
        return {
            list: [
                {
                    content: "一级",
                    value: 1,
                    id: 1,
                    children: [
                        {
                            content: "二级",
                            value: 2,
                            id: 2,
                            children: [
                                {
                                    content: "三级",
                                    value: 3,
                                    id: 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    content: "一级",
                    value: 1,
                    id: 4,
                },
            ],
        };
    },
});
</script>

<style lang="scss">
#Test {
}
</style>
