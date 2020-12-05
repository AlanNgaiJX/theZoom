<template>
    <div id="homepad">
        <div class="page">
            <div class="homepad-head">
                <NavButton></NavButton>
                <Welcome></Welcome>
            </div>
            <div class="appWrap">
                <ul class="appList">
                    <li class="article-app app-item" @click="attachArticle">
                        <SvgIcon name="article" class="app-icon"></SvgIcon>
                        <div class="app-title">Article</div>
                    </li>
                    <li class="clock-app app-item">
                        <SvgIcon name="clock" class="app-icon"></SvgIcon>
                        <div class="app-title">{{ time }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { dateFormat } from "@/unit/commonUtils.ts";
import NavButton from "@/components/homepad/navButton.vue";
import Welcome from "@/components/homepad/welcome.vue";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    components: {
        NavButton,
        Welcome,
        SvgIcon,
    },
    methods: {
        attachArticle() {
            this.attachBgBlur();
        },
    },
    setup() {
        let interval = 0;
        const store = useStore();
        const time = ref("");

        function updateTime() {
            time.value = dateFormat("HH:MM:SS", new Date());
        }

        function attachBgBlur() {
            store.commit("layout/setState", {
                showBlurBg: true,
                showArticleList: true,
            });
        }

        onMounted(() => {
            interval = setInterval(updateTime, 1000);
        });

        onUnmounted(() => {
            clearInterval(interval);
        });

        return { attachBgBlur, time };
    },
});
</script>

<style lang="scss">
#homepad {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;

    .page {
        width: 100%;
        height: 100%;
    }

    .homepad-head {
        width: 100%;
        max-height: 80px;
        padding: 30px;
    }

    .appWrap {
        width: 100%;
        height: calc(100% - 80px - 60px - 30px);
        position: relative;
        overflow: auto;
        box-sizing: border-box;
        padding: 30px 30px 30px 30px;

        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }

    .appList {
        width: 100%;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 120px);
        grid-row-gap: 10px;
        grid-column-gap: 10px;

        li {
            position: relative;
            width: 120px;
            height: 120px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .app-item {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.849);
        transition: box-shadow 0.2s;
        cursor: pointer;

        .app-title {
            position: absolute;
            bottom: 5px;
            font-size: 12px;
            color: #fff;
            text-shadow: 1px 1px 2px #000;
            transition: text-shadow 0.3s;
        }

        .app-icon {
            transition: transform 0.5s;
        }

        &:hover {
            box-shadow: 0 2px 27px 6px rgba(245, 245, 245, 0.849);

            .app-icon {
                animation: bounce;
                animation-duration: 1.2s;
                animation-iteration-count: 1;
            }

            .app-title {
                text-shadow: 5px 5px 5px #000;
            }
        }
    }

    .article-app {
        .app-icon {
            width: 50px;
            height: 50px;
            color: #fff;
        }
    }

    .clock-app {
        .app-icon {
            width: 50px;
            height: 50px;
            color: #fff;
        }
        .app-title {
            letter-spacing: 2px;
        }
    }
}
</style>
