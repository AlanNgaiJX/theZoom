<template>
    <div id="articleList">
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
                <!-- <div class="default-invisible">
                    <ul class="categoryList">
                        <li
                            v-for="(cate, index) in article.categoryList"
                            :key="index"
                            class="cate"
                        >
                            #{{ cate }}
                        </li>
                    </ul>
                </div> -->
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import articleMap, { Article, ArticleMap } from "@/unit/articleMap.ts";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    components: {
        SvgIcon,
    },
    setup(props, context) {
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

        onMounted(() => {
            const articleListDom = document.getElementById("articleList");
            const seracherDom = document.getElementById("searcher");
            if (seracherDom && articleListDom) {
                const top = seracherDom.getBoundingClientRect().top;

                window.addEventListener("scroll", function() {
                    const scrollTop = document.documentElement.scrollTop;
                    if (scrollTop >= top) {
                        articleListDom.classList.add("fixedSearch");
                    } else {
                        articleListDom.classList.remove("fixedSearch");
                    }
                });
            }
        });

        return { currArticleList, routeToArticle, queryTitle };
    },
});
</script>

<style lang="scss">
#articleList {
    position: fixed;
    z-index: 1000;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    @media screen and (min-width: 500px) {
        padding: 50px;
    }

    &.fixedSearch {
        padding-top: 130px;

        .searcher {
            position: fixed;
            top: 0;
            z-index: 1;
        }
    }

    .searcher {
        height: 80px;
        width: 80%;
        max-width: 500px;
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #eee;
        position: relative;

        .icon-search {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }

        input {
            background-color: transparent;
            border: none;
            border-bottom: 1px solid rgb(153, 153, 153);
            max-width: 250px;
            width: 70%;
            height: 20px;
            font-size: 15px;
            padding-bottom: 10px;
        }
    }

    .list {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #333;

        .empty {
            border-bottom: 1px solid #fff;
            padding: 18px 10px 5px 10px;
            max-width: 500px;
            width: 80%;
        }

        .item {
            display: flex;
            flex-direction: column;
            padding: 18px 10px 5px 0;
            border-bottom: 1px solid #fff;
            max-width: 500px;
            width: 80%;
            cursor: pointer;

            &:hover {
                background-color: black;
            }

            .default-visible,
            .default-invisible {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .categoryList {
                display: flex;

                .cate {
                    font-size: 12px;
                    border: 1px solid #fff;
                    border-radius: 10px;
                    padding: 0 5px;
                    margin-right: 10px;
                }
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
