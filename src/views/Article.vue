<template>
    <div id="Article">
        <p class="article-info"></p>
        <p class="article-summary"></p>
        <div class="markdown-body" v-html="markdown"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import articleMap from "@/unit/articleMap.ts";
export default defineComponent({
    name: "Article",
    setup() {
        const route = useRoute();
        const id = route.query.id as string;
        const article = articleMap[id];

        let markdown = "";
        let summaryList: Array<Summary> = [];
        let title = "";
        let author = "";
        let publishTime = "";
        let updateTime = "";

        interface Summary {
            content: string;
            value: number;
            id: string;
        }
        interface ParseLayerTitle {
            (html: string): { summaryList: Array<Summary>; html: string };
        }
        const parseLayerTitle: ParseLayerTitle = function(html: string) {
            const REGs = [
                [/<h1>(.*?)</, /<h1>/, "<h1 id='$'>"],
                [/<h2>(.*?)</, /<h2>/, "<h2 id='$'>"],
                [/<h3>(.*?)</, /<h3>/, "<h3 id='$'>"],
                [/<h4>(.*?)</, /<h4>/, "<h4 id='$'>"],
                [/<h5>(.*?)</, /<h5>/, "<h5 id='$'>"],
                [/<h6>(.*?)</, /<h6>/, "<h6 id='$'>"],
            ];
            const statementList = html.split("/");
            const summaryList: Array<Summary> = [];

            statementList.forEach((statement, sIndex) => {
                if (statement.includes("h")) {
                    REGs.forEach((regCouple, index) => {
                        const matchRes = statement.match(regCouple[0]);
                        if (matchRes) {
                            const id = summaryList.length + "";
                            const template = regCouple[2] as string;

                            summaryList.push({
                                content: matchRes[1],
                                value: index + 1,
                                id: id,
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
            return {
                summaryList,
                html,
            };
        };

        if (article) {
            const parseRes = parseLayerTitle(
                require(`@/assets/mds/${article.fileName}`).html
            );

            markdown = parseRes.html;
            summaryList = parseRes.summaryList;
            title = article.title;
            author = article.author;
            publishTime = article.publishTime;
            updateTime = article.updateTime;
        }

        return { markdown, title, author, publishTime, updateTime };
    },
});
</script>

<style lang="scss">
#Article {
    .article-info {
    }
}
</style>
