import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Test from "@/views/Test.vue";
import Article from "@/views/Article.vue";
import NotFound from "@/views/NotFound.vue";

import ArticleRead from "@/components/article/articleRead.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
    },
    {
        path: "/article/:id",
        name: "Article",
        component: Article,
        children:[
            {
                path:"read",
                name: "ArticleRead",
                component: ArticleRead
            }
        ]
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/:pathMatch(.*)*",// 404 not found
        name: "404",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
