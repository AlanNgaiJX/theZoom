# tsvue3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


模块规划
*欢迎页
*文章列表
    ing
*文章详情
    *阅读 get
    *编辑
*小工具
*个人简历
*绘空间


引用md文件，需要markdowan Loader ，https://www.npmjs.com/package/frontmatter-markdown-loader 
- 安装：在 vue.config.js -> chainWebpack 设置 loader
- 用法：
import fm from "something.md"
fm.attributes // FrontMatter attributes => { subject: "Hello", tags: ["tag1", "tag2"] }
fm.html // Compiled markdown as HTML => "<h1>Title</h1>\n<p>message</p>\n"
fm.react // Component function for React which renders compiled markdown (Disabled as default)
fm.vue.component // Extendable component object for Vue which renders compiled markdown (Disabled as default)
- 样式优化: 使用github的markdown样式 https://www.npmjs.com/package/github-markdown-css，在容器添加 .markdown-body类