<template>
    <div id="articleList" class="mini-scroll">
        <div class="btn-close" @click="close">
            <SvgIcon name="close1" class="icon-close"></SvgIcon>
        </div>
        <div class="searcher" id="searcher">
            <SvgIcon name="search" class="icon-search"></SvgIcon>
            <input type="text" v-model="queryTitle" />
        </div>
        <ul class="list">
            <li class="empty" v-if="!currArticleList.length">未发现内容</li>
            <li
                class="item"
                v-for="(article, index) in currArticleList"
                :key="article.id"
                @click="routeToArticle(article.id)"
            >
                <div class="default-visible">
                    <div class="title">
                        <div class="title-label">{{ index + 1 + "." }}</div>
                        <div class="title-content">{{ article.title }}</div>
                    </div>
                    <div class="publishTime">
                        <SvgIcon
                            name="publishTime"
                            :size="11"
                            class="icon-publishTime"
                        ></SvgIcon
                        >{{ article.publishTime }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import articleMap, { Article, ArticleMap } from "@/unit/articleMap.ts";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    components: {
        SvgIcon,
    },
    setup(props, context) {
        const store = useStore();
        const router = useRouter();
        const allArticle = (function parseArticleMap(
            articleMap: ArticleMap
        ): Array<Article> {
            const list: Array<Article> = [];
            for (const id in articleMap) {
                list.push(articleMap[id]);
            }
            return list;
        })(articleMap);

        const queryTitle = ref("");
        const queryCate = reactive<Array<string>>(["Vue", "React"]);

        const currArticleList = computed(() => {
            return allArticle
                .filter((item) => {
                    return item.title.includes(queryTitle.value);
                })
                .filter((item) => {
                    let valid = true;
                    item.categoryList.forEach((cate) => {
                        if (!queryCate.includes(cate)) {
                            valid = false;
                        }
                    });
                    return valid;
                });
        });

        function routeToArticle(articleId) {
            router.push({
                path: `/article/${articleId}/read`,
            });
        }

        function close() {
            store.commit("layout/setState", {
                showBlurBg: false,
                showArticleList: false,
            });
        }

        return { currArticleList, routeToArticle, queryTitle, close };
    },
});
</script>

<style lang="scss">
#articleList {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    overflow: auto;
    z-index: 1000;

    @media screen and (min-width: 500px) {
        padding: 50px;
    }

    .btn-close {
        position: fixed;
        top: 10%;
        right: 10%;
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
        z-index: 1;

        .icon-close {
            color: #fff;
            width: 40px;
            height: 40px;
        }
    }

    .searcher {
        width: 80%;
        max-width: 500px;
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;

        .icon-search {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            color: #fff;
        }

        input {
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #fff;
            max-width: 250px;
            width: 10%;
            height: 40px;
            font-size: 15px;
            transition: width 1s ease-out;
            color: #fff;
            text-shadow: 1px 1px 2px #000;

            &:hover,
            &:focus {
                width: 70%;
            }
        }
    }

    .list {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;

        .empty {
            border-bottom: 1px solid #fff;
            padding: 18px 10px 5px 10px;
            max-width: 500px;
            width: 80%;
            color: #fff;
            text-shadow: 1px 1px 2px #000;
        }

        .item {
            display: flex;
            flex-direction: column;
            padding: 18px 10px 5px 0;
            border-bottom: 1px solid #fff;
            max-width: 500px;
            width: 80%;
            cursor: pointer;
            color: #fff;
            text-shadow: 1px 1px 2px #000;
            background-color: transparent;
            // transition: background-color .05s;

            // &:hover {
            //     background-color: black;
            // }

            .default-visible,
            .default-invisible {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .title {
                font-size: 16px;
                padding-right: 5px;
                box-sizing: border-box;
                display: flex;

                .title-label {
                    min-width: 30px;
                    flex-shrink: 0;
                    text-align: right;
                    margin-right: 5px;
                }
            }

            .publishTime {
                font-size: 12px;
                width: 90px;
                margin-left: 5px;
                flex-shrink: 0;

                .icon-publishTime {
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
