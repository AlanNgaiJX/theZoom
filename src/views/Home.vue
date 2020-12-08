<template>
    <div id="Home">
        <Background index="1,99"></Background>
        <Glass>
            <Homepad></Homepad>
        </Glass>
        <BlurBackground index="1,99"></BlurBackground>

        <!-- 你可以在这里用个router view -->
        <transition
            enter-active-class="animate__animated animate__fadeIn animate__fast"
            leave-active-class="animate__animated animate__zoomOutUp animate__fast"
        >
            <ArticleList v-if="showArticleList"></ArticleList>
        </transition>

        <transition
            enter-active-class="animate__animated animate__fadeIn animate__fast"
            leave-active-class="animate__animated animate__zoomOutUp animate__fast"
        >
            <Clock v-if="showClock"></Clock>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Background from "@/components/background.vue";
import BlurBackground from "@/components/blurBackgroundx.vue";

import Glass from "@/components/glass.vue";
import Homepad from "@/components/homepad/homepadIndex.vue";
import ArticleList from "@/components/articleList/articleList.vue";
import Clock from "@/components/clock/clock.vue";

export default defineComponent({
    name: "Home",
    components: {
        Background,
        BlurBackground,
        Glass,
        Homepad,
        ArticleList,
        Clock,
    },
    setup() {
        const store = useStore();
        const showArticleList = computed(() => {
            return store.state.layout.showArticleList;
        });

        const showClock = computed(() => {
            return store.state.layout.showClock;
        });

        return { showArticleList, showClock };
    },
});
</script>

<style lang="scss">
#Home {
}
</style>
