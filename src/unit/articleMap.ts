type ArticleCategory = "Vue" | "React";
export interface Article {
    fileName: string;
    title: string;
    author: string;
    publishTime: string;
    updateTime: string;
    categoryList: Array<ArticleCategory>;
}
interface ArticleMap {
    [index: string]: Article;
}

const articleMap: ArticleMap = {
    A0001: {
        fileName: "你好啊世界.md",
        title: "你好啊世界",
        author: "AlanNgai",
        publishTime: "2020-02-28",
        updateTime: "2020-08-28",
        categoryList: ["Vue"],
    },
    A0002: {
        fileName: "标题测试.md",
        title: "标题测试",
        author: "AlanNgai",
        publishTime: "2020-02-28",
        updateTime: "2020-08-28",
        categoryList: ["Vue","React"],
    },
};

export default articleMap;
