<template>
    <div id="Home">
        <Background index="1,99"></Background>
        <Glass>
            <Homepad></Homepad>
        </Glass>
        <ArticleList v-if="showArticleList"></ArticleList>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Background from "@/components/background.vue";
import Glass from "@/components/glass.vue";
import Homepad from "@/components/homepad/homepadIndex.vue";
import ArticleList from "@/components/articleList/articleList.vue";

export default defineComponent({
    name: "Home",
    components: {
        Background,
        Glass,
        Homepad,
        ArticleList,
    },
    setup() {
        const store = useStore();
        const showArticleList = computed(() => {
            return store.state.layout.showArticleList;
        });

        return { showArticleList };
    },
});
</script>

<style lang="scss">
#Home {
}
</style>
