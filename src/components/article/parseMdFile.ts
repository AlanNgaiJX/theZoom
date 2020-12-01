// 目录节点
export interface SummaryItem {
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
export interface ParseMdFile {
    (html: string): {
        summaryLevelList: Array<SummaryItem>;
        html: string;
    };
}
export const parseMdFile: ParseMdFile = function(html: string) {
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
            const itemsAtLevel: Array<SummaryItem> = [];
            summaryFlatList.forEach((item) => {
                if (item.level === level) {
                    itemsAtLevel.push(item);
                }
            });
            return itemsAtLevel;
        }

        /* 层级关系数组 转为 扁平数组，方便搜索父节点  (level降序) */
        function flatLevelList(levelList) {
            const res: Array<SummaryItem> = [];
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
