<script lang="ts">
import { defineComponent, h } from "vue";
import SummaryItem from "./summaryItem.vue";
import SummaryLayer from "./summaryLayer.vue";

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
        limitLevel: {
            type: Number,
            default: 3,
        },
    },
    render() {
        const renderList = (list, currLevel) => {
            if (list && list.length) {
                return h(
                    SummaryLayer,
                    {
                        level: currLevel,
                    },
                    {
                        default: () => {
                            return list.map((item) => {
                                return h(
                                    SummaryItem,
                                    {
                                        id: item.id,
                                        content: item.content,
                                        level: item.level,
                                    },
                                    {
                                        default: () => {
                                            if (item.level >= this.limitLevel) {
                                                return;
                                            }
                                            return renderList(
                                                item.children,
                                                item.level + 1
                                            );
                                        },
                                    }
                                );
                            });
                        },
                    }
                );
            }
        };
        return h(
            "div",
            {
                class: "summary-list",
            },
            renderList(this.list, 1)
        );
    },
});
</script>

<style lang="scss">
.summary-list {
    position: relative;

    // 第一级的竖线
    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 2px;
        background-color: #eff1f2;
        left: 4px;
        top: 8px;
        bottom: 8px;
    }
}
</style>
