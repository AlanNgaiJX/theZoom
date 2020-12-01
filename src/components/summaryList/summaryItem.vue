<template>
    <div class="summary-item">
        <div
            class="content"
            :data-level="level"
            :title="content"
            @click="scrollTo"
            :class="{ active: isActive }"
        >
            <div class="dot"></div>
            <div class="text">{{ content }}</div>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "summaryItem",
    emits: ["scroll-to"],
    props: {
        id: {
            type: String,
            required: true,
        },
        activeId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
    },
    setup(props, context) {
        const isActive = computed(() => {
            return props.id === props.activeId;
        });

        function scrollTo(e) {
            context.emit("scroll-to", { e, id: props.id });
        }

        return { isActive, scrollTo };
    },
});
</script>

<style lang="scss">
.summary-item {
    .content {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        cursor: pointer;
        &.active {
            color: #007fff;

            .dot::before {
                background-color: #007fff;
            }
        }

        &:hover {
            background-color: #f6f8fa;
        }

        // 那个点
        .dot {
            width: 10px;
            height: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            flex-shrink: 0;

            &::before {
                content: "";
                display: block;
                background-color: black;
                border-radius: 50%;
            }
        }

        .text {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            flex-shrink: 1;
        }

        &[data-level="1"] {
            font-size: 14px;
            font-weight: bold;

            .dot::before {
                width: 6px;
                height: 6px;
            }
        }

        &[data-level="2"] {
            font-size: 13px;

            .dot::before {
                width: 4px;
                height: 4px;
            }
        }

        &[data-level="3"] {
            font-size: 12px;

            .dot::before {
                width: 2px;
                height: 2px;
            }
        }
    }
}
</style>
