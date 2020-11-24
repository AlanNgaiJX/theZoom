<template>
    <div id="Article">
        <p class="article-info"></p>
        <div class="article-summary">
            <!-- <ul class="summary-list">
                <li class="summary-item layer1">一级</li>
                <li class="summary-item layer2">二级</li>
                <li class="summary-item layer3">三级</li>
                <li class="summary-item layer4">四级</li>
                <li class="summary-item layer5">五级</li>
                <li class="summary-item layer6">六级</li>
            </ul> -->
        </div>
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
        let summaryFlatList: Array<SummaryItem> = [];
        let title = "";
        let author = "";
        let publishTime = "";
        let updateTime = "";
        // level flat
        interface SummaryItem {
            content: string;
            value: number;
            id: string;
            index: number;
            children?: Array<SummaryItem>;
        }
        interface ParseMdFile {
            (html: string): {
                summaryFlatList: Array<SummaryItem>;
                html: string;
            };
        }
        const parseMdFile: ParseMdFile = function(html: string) {
            const REGs = [
                [/<h1>(.*?)</, /<h1>/, "<h1 id='$'>"],
                [/<h2>(.*?)</, /<h2>/, "<h2 id='$'>"],
                [/<h3>(.*?)</, /<h3>/, "<h3 id='$'>"],
                [/<h4>(.*?)</, /<h4>/, "<h4 id='$'>"],
                [/<h5>(.*?)</, /<h5>/, "<h5 id='$'>"],
                [/<h6>(.*?)</, /<h6>/, "<h6 id='$'>"],
            ];
            // 取最小的为一级 、 中间有断序的后一号补上
            const statementList = html.split("/");
            let summaryFlatList: Array<SummaryItem> = [];
            let summaryLevelList: Array<SummaryItem> = [];

            statementList.forEach((statement, sIndex) => {
                if (statement.includes("h")) {
                    REGs.forEach((regCouple, index) => {
                        const matchRes = statement.match(regCouple[0]);
                        if (matchRes) {
                            const id = summaryFlatList.length + "";
                            const template = regCouple[2] as string;

                            summaryFlatList.push({
                                content: matchRes[1],
                                value: index + 1,
                                id: id,
                                index: summaryFlatList.length,
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

            // 调整summaryFlatList中的value，做了缺级补齐
            const { list, maxLevel } = (function sortSummaryFlatList(list) {
                const valueArr: Array<number> = []; // 当前所出现过的级别
                const lack = new Set([1, 2, 3, 4, 5, 6]); //初始值为所有级别，后面出现一个删一个，得出当前缺失什么级别

                list.forEach(({ value }) => {
                    valueArr.push(value);
                    lack.delete(value);
                });

                const min = Math.min(...valueArr);
                const max = Math.max(...valueArr);

                lack.forEach((value) => {
                    if (value < min || value > max) {
                        lack.delete(value);
                    }
                });

                let maxLevel = 0;
                list.forEach(({ value }, index) => {
                    let result = 0;
                    let count = 0;

                    lack.forEach((lackValue) => {
                        if (value > lackValue) {
                            count++;
                        }
                    });

                    result = value - count - min + 1;
                    list[index].value = result;
                    result > maxLevel && (maxLevel = result);
                });
                return { list, maxLevel };
            })(summaryFlatList);
            summaryFlatList = list;
            // console.log(summaryFlatList);

            // 从扁平数组 转化为具有层级关系的数组
            summaryLevelList = (function getSummaryLevel(
                summaryFlatList,
                maxLevel
            ) {
                const resultList: Array<SummaryItem> = [];
                function getItemsAtLevel(level) {
                    const itemsAtLevel: Array<any> = [];
                    summaryFlatList.forEach((item) => {
                        if (item.value === level) {
                            itemsAtLevel.push(item);
                        }
                    });
                    return itemsAtLevel;
                }

                function flatLevelList(levelList){
                    const res: Array<any> = [];
                    (function flat(list){
                        list.forEach(item => {
                            if (item.children) {
                                flat(item.list);
                            }else{
                                res.push(item);
                            }
                        });
                    })(levelList)

                    return res.sort((a,b)=>b.index - a.index);
                }

                function insertToParent(summaryItem){
                    const flatResultList = flatLevelList(resultList);//index降序
                    flatResultList.find(item=> summaryItem.index > item.index)
                    summaryItem.index
                }


                for (let l = 1; l < maxLevel; l++) {
                    const itemsAtLevel = getItemsAtLevel(l);

                    itemsAtLevel.forEach((item) => {
                        // resultList.find((i) => i.index === item.index);
                        // 从resultList中获取父节点 ，成立条件 item.index > 父节点的index
                    });
                }

                return [];
            })(summaryFlatList, maxLevel);

            return {
                summaryFlatList,
                html,
            };
        };

        if (article) {
            const parseRes = parseMdFile(
                require(`@/assets/mds/${article.fileName}`).html
            );

            markdown = parseRes.html;
            summaryFlatList = parseRes.summaryFlatList;
            title = article.title;
            author = article.author;
            publishTime = article.publishTime;
            updateTime = article.updateTime;
        }

        return {
            markdown,
            summaryFlatList,
            title,
            author,
            publishTime,
            updateTime,
        };
    },
});
</script>

<style lang="scss">
#Article {
    .article-info {
    }

    .article-summary {
        width: 180px;
        height: 500px;
        background-color: #eeeeee;
        position: fixed;
        top: 0;
        right: 0;

        .summary-list {
            .summary-item {
                font-size: 14px;
                display: flex;
                align-items: center;

                &.layer1 {
                    font-weight: bold;

                    &::before {
                        width: 6px;
                        height: 6px;
                    }
                }

                &.layer2 {
                    &::before {
                        width: 4px;
                        height: 4px;
                    }
                }

                &::before {
                    content: "";
                    display: block;
                    background-color: black;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                &:hover {
                    background-color: #ebedef;
                    cursor: pointer;
                }

                &.active {
                    color: #007fff;
                }
            }
        }
    }
}
</style>
