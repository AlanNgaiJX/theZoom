import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import "@/assets/css/common.css";
import "@/assets/css/fontFile.css";
import "@/assets/css/animate.css";
import "@/assets/css/box-shadows.css";
import "github-markdown-css";
import "@/assets/css/github-markdown-config.css";


console.log(this === window);
console.log(this);

// 导入/svgIcon文件夹下的所有.svg文件
const requireAll = (requireContext: any) =>
    requireContext.keys().map(requireContext);
const req = require.context("@/assets/images/icon/svgIcon", false, /\.svg$/);
requireAll(req);

createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
