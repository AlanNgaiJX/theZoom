<template>
    <div class="summary-item">
        <div
            class="content"
            :data-level="level"
            :title="content"
            @click="scrollTo"
        >
            <div class="dot"></div>
            <div class="text">{{ content }}</div>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import gsap from "@/unit/gsapUnit.ts";
import CustomEase from "@/unit/CustomEase/CustomEase.js";

export default defineComponent({
    name: "summaryItem",
    props: {
        id: {
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
    data() {
        return {
            isFlashing: false,
        };
    },
    methods: {
        scrollTo() {
            const target = document.getElementById(this.id);
            if (!target) return;

            const targetHLevel = parseInt(target.nodeName.replace("H", ""));
            const flashList: Array<Element> = [];
            const children = document.querySelector(".markdown-body")?.children;
            const PADDING_TOP = 50;
            let targetElIndex: number | null = null;

            if (children && children.length) {
                for (let i = 0; i < children.length; i++) {
                    const currEl = children[i];

                    // 从当前标签开始
                    if (currEl === target) {
                        targetElIndex = i;
                        flashList.push(currEl);
                        // break;
                    }
                    // 后代先不考虑添加动画了，太多dom一起执行动画很卡
                    // 继续搜索同级的其他标签，遇到下一个同级的或上一级H标签 停止
                    if (targetElIndex !== null && i > targetElIndex) {
                        const currElTagName = currEl.nodeName;
                        const match = currElTagName.match(/^H(\d+)$/);

                        // 是否H标签
                        if (match) {
                            const currElHLevel = parseInt(match[1]);
                            if (currElHLevel > targetHLevel) {
                                flashList.push(currEl);
                            } else {
                                break;
                            }
                        } else {
                            flashList.push(currEl);
                        }
                    }
                }
            }

            const flashTheList = () => {
                if (this.isFlashing) {
                    return;
                }
                // 添加闪烁动画
                gsap.to(flashList, {
                    backgroundColor: "grey",
                    color: "#fff",
                    ease: CustomEase.create(
                        //M型
                        "custom",
                        "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.418,1 0.398,1.012 0.726,0.998 0.758,0.846 0.782,0.73 0.824,0.55 0.863,0.382 1,0 1,0 "
                    ),
                    duration: 1.5,
                    onStart: () => {
                        this.isFlashing = true;
                    },
                    onComplete: () => {
                        this.isFlashing = false;
                    },
                });
            };

            const hasScrollbar = () => {
                return (
                    document.body.scrollHeight >
                    (window.innerHeight ||
                        document.documentElement.clientHeight)
                );
            };

            // 页面没有滚动条
            if (!hasScrollbar()) {
                flashTheList();
                return;
            }

            // 原生的无动画滚动
            // document.documentElement.scrollTop = target.offsetTop - PADDING_TOP;

            // 利用gsap实现动画滚动
            gsap.to(window, {
                duration: 1,
                scrollTo: target.offsetTop - PADDING_TOP, //给个padding
                onComplete: () => {
                    flashTheList();
                },
            });
        },
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
