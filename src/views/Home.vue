<template>
    <div id="Home">
        <Background index="1,99"></Background>
        <Glass>
            <Homepad></Homepad>
        </Glass>
        <BlurBackground index="1,99"></BlurBackground>
        <transition
            enter-active-class="animate__animated animate__fadeIn animate__fast"
            leave-active-class="animate__animated animate__zoomOutUp animate__fast"
        >
            <ArticleList v-if="showArticleList"></ArticleList>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Background from "@/components/background.vue";
import BlurBackground from "@/components/blurBackgroundx.vue";

import Glass from "@/components/glass.vue";
import Homepad from "@/components/homepad/homepadIndex.vue";
import ArticleList from "@/components/articleList/articleList.vue";

export default defineComponent({
    name: "Home",
    components: {
        Background,
        BlurBackground,
        Glass,
        Homepad,
        ArticleList,
    },
    setup() {
        const store = useStore();
        const showArticleList = computed(() => {
            return store.state.layout.showArticleList;
        });

        onMounted(() => {
            setInterval(function() {
                store.commit("layout/setCurrDate", new Date());
            }, 1000);
        });

        return { showArticleList };
    },
});
</script>

<style lang="scss">
#Home {
}
</style>
