<template>
    <div id="ArticleRead">
        <!-- 顶部的文章信息 -->
        <div class="article-info">
            <h1 class="info-title">{{ articleInfo.title }}</h1>
            <div class="row">
                <p class="info-author">
                    <SvgIcon name="author" class="icon-author"></SvgIcon
                    >{{ articleInfo.author }}
                </p>
                <div class="time">
                    <p class="info-publish-time">
                        <SvgIcon
                            name="publishTime"
                            class="icon-publishTime"
                        ></SvgIcon>
                        {{ articleInfo.publishTime }}
                    </p>
                    <p class="info-update-time">
                        <SvgIcon
                            name="updateTime"
                            class="icon-updateTime"
                        ></SvgIcon>
                        {{ articleInfo.updateTime }}
                    </p>
                </div>
            </div>
        </div>

        <!-- 右边的目录 -->
        <div class="article-summary">
            <div class="title" @click="scrollToTop">目录</div>
            <SummaryList :list="summaryLevelList"></SummaryList>
        </div>

        <!-- 文章内容 -->
        <div class="markdown-body" v-html="html"></div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    watch,
    ref,
    reactive,
    onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import gsap from "@/unit/gsapUnit.ts";
import articleMap, { Article } from "@/unit/articleMap.ts";
import SummaryList from "@/components/summaryList/summaryList.vue";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    name: "ArticleRead",
    components: {
        SummaryList,
        SvgIcon,
    },
    setup() {
        // 目录节点
        interface SummaryItem {
            content: string;
            level: number;
            id: string;
            index: number;
            children?: Array<SummaryItem>;
        }

        /* 
            解析md文件，获取 html 和 目录层级列表：
                - 搜索 h1 ~ h6 标签， 存储为扁平化的数组, 并打上id
                - 将扁平化数组 转换 为层级关系数组
        */
        interface ParseMdFile {
            (html: string): {
                summaryLevelList: Array<SummaryItem>;
                html: string;
            };
        }
        const parseMdFile: ParseMdFile = function(html: string) {
            // 所需的正则和模板
            const REGs = [
                [/<h1>(.*?)</, /<h1>/, "<h1 id='$'>"],
                [/<h2>(.*?)</, /<h2>/, "<h2 id='$'>"],
                [/<h3>(.*?)</, /<h3>/, "<h3 id='$'>"],
                [/<h4>(.*?)</, /<h4>/, "<h4 id='$'>"],
                [/<h5>(.*?)</, /<h5>/, "<h5 id='$'>"],
                [/<h6>(.*?)</, /<h6>/, "<h6 id='$'>"],
            ];
            const statementList = html.split("/");
            let summaryFlatList: Array<SummaryItem> = [];
            let summaryLevelList: Array<SummaryItem> = [];

            statementList.forEach((statement, sIndex) => {
                if (statement.includes("h")) {
                    REGs.forEach((regCouple, rIndex) => {
                        const matchRes = statement.match(regCouple[0]);
                        if (matchRes) {
                            const template = regCouple[2] as string;
                            const id = "title-" + summaryFlatList.length + "";
                            const index = summaryFlatList.length;

                            summaryFlatList.push({
                                content: matchRes[1],
                                level: rIndex + 1,
                                id: id,
                                index: index,
                            });

                            statementList[sIndex] = statement.replace(
                                regCouple[1],
                                template.replace("$", id)
                            );
                        }
                    });
                }
            });
            html = statementList.join("/");

            /* 调整summaryFlatList中的level，检查空缺等级，做级别提升 */
            const { list, maxLevel } = (function sortSummaryFlatList(list) {
                // 当前所出现过的级别
                const levelArr: Array<number> = [];

                //初始值为所有级别，后面出现一个删一个，得出当前缺失什么级别
                const lack = new Set([1, 2, 3, 4, 5, 6]);

                list.forEach(({ level }) => {
                    levelArr.push(level);
                    lack.delete(level);
                });

                // 最小 和 最大级别
                const min = Math.min(...levelArr);
                const max = Math.max(...levelArr);

                lack.forEach((level) => {
                    if (level < min || level > max) {
                        lack.delete(level);
                    }
                });

                // 调整后的最大级别
                let maxLevel = 0;
                list.forEach(({ level }, index) => {
                    let result = 0;
                    let count = 0;

                    lack.forEach((lackLevel) => {
                        if (level > lackLevel) {
                            count++;
                        }
                    });

                    // 结果 = 当前级别 - 前面所缺的级别 - 最小的级别 + 1
                    result = level - count - min + 1;
                    list[index].level = result;

                    // 记录最高级别
                    result > maxLevel && (maxLevel = result);
                });
                return { list, maxLevel };
            })(summaryFlatList);
            summaryFlatList = list;

            /* 从扁平数组 转化为具有层级关系的数组 */
            summaryLevelList = summaryLevelList = (function getSummaryLevel(
                summaryFlatList,
                maxLevel
            ) {
                const resultList: Array<SummaryItem> = [];

                /* 获取同级别的所有节点 */
                function getItemsAtLevel(level) {
                    const itemsAtLevel: Array<any> = [];
                    summaryFlatList.forEach((item) => {
                        if (item.level === level) {
                            itemsAtLevel.push(item);
                        }
                    });
                    return itemsAtLevel;
                }

                /* 层级关系数组 转为 扁平数组，方便搜索父节点  (level降序) */
                function flatLevelList(levelList) {
                    const res: Array<any> = [];
                    (function flat(list) {
                        list.forEach((item) => {
                            if (item.children) {
                                flat(item.children);
                            }
                            res.push(item);
                        });
                    })(levelList);

                    return res.sort((a, b) => b.index - a.index);
                }

                /* 子节点插入到父节点 */
                function insertToParent(summaryItem) {
                    const flatResultList = flatLevelList(resultList);
                    const parent = flatResultList.find(
                        (item) =>
                            summaryItem.index > item.index &&
                            summaryItem.level !== item.level
                    );

                    if (parent) {
                        if (!parent.children) {
                            parent.children = [];
                        }
                        parent.children.push(summaryItem);
                    } else {
                        //都没找到就是首层元素
                        resultList.push(summaryItem);
                    }
                }

                for (let l = 1; l <= maxLevel; l++) {
                    const itemsAtLevel = getItemsAtLevel(l);
                    itemsAtLevel.forEach((item) => {
                        insertToParent(item);
                    });
                }

                return resultList;
            })(summaryFlatList, maxLevel);

            return {
                html,
                summaryLevelList,
            };
        };

        const route = useRoute();
        const router = useRouter();
        const html = ref("");
        const articleInfo = reactive<Article>({
            fileName: "",
            title: "",
            author: "",
            publishTime: "",
            updateTime: "",
        });
        const summaryLevelList: Array<SummaryItem> = reactive([]);

        // 文章id
        const id = computed(() => {
            return route.params.id as string;
        });

        watch(
            id,
            (id) => {
                Object.assign(articleInfo, articleMap[id]);
                if (articleInfo) {
                    const parseRes = parseMdFile(
                        require(`@/assets/mds/${articleInfo.fileName}`).html
                    );
                    html.value = parseRes.html;
                    summaryLevelList.splice(
                        0,
                        summaryLevelList.length,
                        ...parseRes.summaryLevelList
                    );
                } else {
                    router.replace({
                        path: "/404",
                    });
                }
            },
            { immediate: true }
        );

        return {
            html,
            summaryLevelList,
            articleInfo,
        };
    },
    methods: {
        scrollToTop() {
            const hasScrollbar = () => {
                return (
                    document.body.scrollHeight >
                    (window.innerHeight ||
                        document.documentElement.clientHeight)
                );
            };

            if (!hasScrollbar()) {
                return;
            }
            
            gsap.to(window, { duration: 1, scrollTo: 0 });
        },
    },
});
</script>

<style lang="scss">
#ArticleRead {
    .article-info {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 900px;
        margin: 0 auto;
        padding: 45px 45px 20px 45px;
        position: relative;
        .info-title {
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 2px;
        }

        .row {
            display: flex;
            margin-top: 15px;
            align-items: center;
            box-sizing: border-box;

            .info-author {
                font-size: 14px;
                height: 14px;
                line-height: 14px;

                .icon-author {
                    width: 14px;
                    height: 14px;
                    margin-right: 5px;
                    color: #333333;
                }
            }

            .time {
                font-size: 12px;
                width: 200px;
                display: flex;
                justify-content: space-between;
                margin-left: 150px;

                .icon-publishTime {
                    width: 12px;
                    height: 12px;
                    color: #333333;
                }

                .icon-updateTime {
                    width: 13px;
                    height: 13px;
                    color: #333333;
                }
            }
        }

        &::after {
            content: "";
            display: block;
            width: 50%;
            height: 1px;
            background-color: #dbdbdb;
            position: absolute;
            bottom: 0;
        }
    }

    @media (max-width: 767px) {
        .article-info {
            padding: 15px;
        }
    }

    .article-summary {
        .title {
            margin-bottom: 10px;
            cursor: pointer;
        }

        width: 20%;
        background-color: #fff;
        position: fixed;
        top: 0;
        right: 0;
        box-sizing: border-box;
        padding: 50px 18px 10px 8px;
    }

    /* 媒体查询，调整目录 */

    // 当屏幕宽小于1250px时隐藏目录
    @media screen and (max-width: 1250px) {
        .article-summary {
            display: none;
        }
    }

    // 当屏幕小于1600px时，目录宽17%
    @media screen and (max-width: 1800px) {
        .article-summary {
            width: 17%;
        }
    }

    // 当屏幕大于1600px时，目录宽17%
    @media screen and (min-width: 1800px) {
        .article-summary {
            right: 5%;
            width: 20%;
        }
    }
}
</style>
