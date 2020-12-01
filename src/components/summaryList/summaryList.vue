<script lang="ts">
import {
    computed,
    defineComponent,
    h,
    ref,
    PropType,
    onMounted,
    onBeforeUnmount,
} from "vue";
import gsap from "@/unit/gsapUnit.ts";
import CustomEase from "@/unit/CustomEase/CustomEase.js";
import { throttle, ThrottleFun } from "@/unit/commonUtils";

import { SummaryItem } from "@/components/article/parseMdFile";
import SummaryItemCom from "./summaryItem.vue";
import SummaryLayer from "./summaryLayer.vue";

interface ElInfo {
    id: string;
    el: HTMLElement;
    offsetTop: number;
}

export default defineComponent({
    name: "summaryList",
    components: {
        SummaryItemCom,
        SummaryLayer,
    },
    props: {
        list: {
            type: Array as PropType<Array<SummaryItem>>,
            required: true,
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
                                    SummaryItemCom,
                                    {
                                        id: item.id,
                                        content: item.content,
                                        level: item.level,
                                        activeId: this.activeId,
                                        onScrollTo: this.handleScrollTo,
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
    setup(props) {
        const activeId = ref("title-0");
        const flatIdList = computed(() => {
            const flatIdList: Array<string> = [];
            (function flat(list) {
                list.forEach((item) => {
                    if (item.level <= props.limitLevel) {
                        if (item.children) {
                            flat(item.children);
                        }
                        flatIdList.push(item.id);
                    }
                });
            })(props.list);
            return flatIdList;
        });
        const PADDING_TOP = 50;

        let currActive: ElInfo | null = null;
        let splitAtIndex = -1;
        let isFlashing = false;

        function scrollHandler() {
            //因为图片可能未加载完全的原因,在onMounted阶段未必能得到真正的offsetTop,只能把这个获取时机尽量往后面靠
            const elInfoList: Array<ElInfo> = [];
            const viewportHeight = document.documentElement.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            const maxScrollValue = scrollHeight - viewportHeight; //scrollValue一共可以滚动这么多
            const scrollAtLast = viewportHeight / 2;
            const scrollValue = document.documentElement.scrollTop;

            flatIdList.value.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const offsetTop = el.offsetTop;
                    elInfoList.push({
                        id,
                        el,
                        offsetTop,
                    });
                }
            });
            elInfoList.sort((a, b) => {
                return b.offsetTop - a.offsetTop;
            });

            if (scrollValue < maxScrollValue - scrollAtLast) {
                for (let i = 0; i < elInfoList.length; i++) {
                    const elInfo = elInfoList[i];

                    if (scrollValue > elInfo.offsetTop - PADDING_TOP) {
                        currActive = elInfo;
                        break;
                    }
                }
            } else {
                //还剩下半屏屏高度可以滚动时，看后面还有多少个标题，然后平均分这段距离
                if (splitAtIndex === -1) {
                    splitAtIndex = elInfoList.findIndex(
                        (item) => currActive && item.id === currActive.id
                    );
                } else {
                    const ave = scrollAtLast / splitAtIndex; //平均分n份
                    for (let i = 0; i < splitAtIndex; i++) {
                        if (scrollValue > maxScrollValue - (i + 1) * ave) {
                            currActive = elInfoList[i];
                            break;
                        }
                    }
                }
            }

            if (currActive) {
                activeId.value = currActive.id;
            }
        }

        let throttleScrollHandler: ThrottleFun<(this: Window, ev: Event) => any> | null = throttle(
            scrollHandler,
            5
        );

        function addScrollListener() {
            if (throttleScrollHandler !== null) {
                window.addEventListener("scroll", throttleScrollHandler);
            }
        }

        function removeScrollListener() {
            if (throttleScrollHandler !== null) {
                window.removeEventListener("scroll", throttleScrollHandler);
            }
        }

        function handleScrollTo({ id }) {
            removeScrollListener();
            const target = document.getElementById(id);
            if (!target) return;

            const targetHLevel = parseInt(target.nodeName.replace("H", ""));
            const flashList: Array<Element> = [];
            const children = document.querySelector(".markdown-body")?.children;
            let targetElIndex: number | null = null;

            activeId.value = id;

            if (children && children.length) {
                for (let i = 0; i < children.length; i++) {
                    const currEl = children[i];

                    // 从当前标签开始
                    if (currEl === target) {
                        targetElIndex = i;
                        flashList.push(currEl);
                    }

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
                if (isFlashing) {
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
                    duration: 1.2,
                    onStart: () => {
                        isFlashing = true;
                    },
                    onComplete: () => {
                        isFlashing = false;
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
                    addScrollListener();
                },
            });
        }

        onMounted(() => {
            addScrollListener();
        });

        onBeforeUnmount(() => {
            throttleScrollHandler = null;
            removeScrollListener();
        });

        return { activeId, handleScrollTo };
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
