<script lang="ts">
import { defineComponent, h } from "vue";
import SummaryItem from "@/components/summaryItem.vue";
import SummaryLayer from "@/components/summaryLayer.vue";

export default defineComponent({
    name: "summaryList",
    components: {
        SummaryItem,
        SummaryLayer,
    },
    props: {
        list: {
            type: Array,
        },
    },
    render() {
        this.list;
        function renderList(list) {
            if (list && list.length) {
                return h(
                    SummaryLayer,
                    {},
                    {
                        default: () => {
                            return list.map((item) => {
                                return h(
                                    SummaryItem,
                                    {
                                        id: item.id,
                                        content: item.content,
                                    },
                                    {
                                        default: () => {
                                            return renderList(item.children);
                                        },
                                    }
                                );
                            });
                        },
                    }
                );
            }
        }
        return h(
            "div",
            {
                class: "summaryList",
            },
            renderList(this.list)
        );
    },
});
</script>

<style lang="scss">
.summaryList {
    border: 1px solid red;
}
</style>
