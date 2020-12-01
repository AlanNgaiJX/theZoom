<template>
    <div id="ArticleRead">
        <div class="ruler">
            <div class="rsub r1"></div>
            <div class="rsub r2"></div>
            <div class="rsub r3"></div>
            <div class="rsub r4"></div>
        </div>
        <!-- 顶部的文章信息 -->
        <ArticleInfo :articleInfo="articleInfo"></ArticleInfo>

        <!-- 右边的目录 -->
        <div class="article-summary">
            <div class="title" @click="scrollToTop">目录</div>
            <SummaryList :list="summaryLevelList"></SummaryList>
        </div>

        <!-- 文章内容 -->
        <div class="markdown-body" v-html="html"></div>

        <!-- <div class="makeup-foot" :style="footHeight"></div> -->
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import gsap from "@/unit/gsapUnit.ts";
import articleMap, { Article } from "@/unit/articleMap";
import { SummaryItem, parseMdFile } from "./parseMdFile";
import ArticleInfo from "./articleInfo.vue";
import SummaryList from "@/components/summaryList/summaryList.vue";

export default defineComponent({
    name: "ArticleRead",
    components: {
        ArticleInfo,
        SummaryList,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        // 文章id
        const id = computed(() => {
            return route.params.id as string;
        });
        // 文章信息
        const articleInfo = reactive<Article>({
            fileName: "",
            title: "",
            author: "",
            publishTime: "",
            updateTime: "",
            categoryList: [],
        });
        // 文章内容
        const html = ref("");
        // 文章层级目录
        const summaryLevelList: Array<SummaryItem> = reactive([]);

        watch(
            id,
            (id) => {
                Object.assign(articleInfo, articleMap[id]);
                if (articleInfo) {
                    // 解析md文件，获取 html 和 目录层级列表
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

        const footHeight = {
            height: document.documentElement.clientHeight - 100 + "px",
        };

        return {
            html,
            summaryLevelList,
            articleInfo,
            footHeight,
        };
    },
    methods: {
        //【 点击目录，滚动到顶部 】
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

    .makeup-foot {
        // height: 500px;
        width: 100%;
    }
}
</style>
