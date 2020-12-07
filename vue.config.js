// const Mode = require("frontmatter-markdown-loader/mode");
const path = require("path");

module.exports = {
    chainWebpack: (config) => {
        // 1.解析markdown .md文件
        config.module
            .rule()
            .test(/\.md$/)
            .use()
            .loader("frontmatter-markdown-loader");
        // .options({ mode: [Mode.VUE_COMPONENT, Mode.VUE_RENDER_FUNCTIONS] });//想使用这两个模式来着，那样可以把md转义为一个vue组件用，可惜有些依赖只兼容到vue2.6

        // 2.解析svg文件，该插件会自动将@/src/assets/icon/svgIcon下的svg文件,整合并注入到document中
        config.module
            .rule("svg")
            .exclude.add(path.resolve("src/assets/images/icon/svgIcon")) // url-loader不处理
            .end();
        config.module
            .rule("icon")
            .test(/\.svg$/)
            .include.add(path.resolve("src/assets/images/icon/svgIcon"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
    },
    devServer: {
        https: false,
    },
};
