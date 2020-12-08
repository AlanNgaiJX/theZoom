<!-- 顶部的文章信息 -->
<template>
    <div id="article-info">
        <h1 class="info-title">{{ articleInfo.title }}</h1>
        <div class="info-authorNtime">
            <p class="info-author">
                <SvgIcon name="author" class="icon-author"></SvgIcon
                >{{ articleInfo.author }}
            </p>
            <div class="time">
                <p class="info-publish-time">
                    <SvgIcon
                        name="publishTime"
                        class="icon-publishTime"
                    ></SvgIcon>
                    {{ articleInfo.publishTime }}
                </p>
                <p class="info-update-time">
                    <SvgIcon
                        name="updateTime"
                        class="icon-updateTime"
                    ></SvgIcon>
                    {{ articleInfo.updateTime }}
                </p>
            </div>
        </div>
        <ul class="info-categoryList">
            <li class="icon">
                <SvgIcon name="category" :size="16"></SvgIcon>
            </li>
            <li
                class="category"
                v-for="(item, index) in articleInfo.categoryList"
                :key="index"
                v-text="'#' + item"
            ></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    name: "articleInfo",
    components: {
        SvgIcon,
    },
    props: {
        articleInfo: {
            type: Object,
        },
    },
});
</script>

<style lang="scss">
#article-info {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 45px 20px 45px;
    position: relative;

    .info-title {
        font-size: 25px;
        font-weight: bold;
        letter-spacing: 2px;
    }

    .info-authorNtime {
        display: flex;
        margin-top: 15px;
        align-items: center;
        box-sizing: border-box;

        .info-author {
            font-size: 14px;
            height: 14px;
            line-height: 14px;

            .icon-author {
                width: 14px;
                height: 14px;
                margin-right: 5px;
                color: #333333;
            }
        }

        .time {
            font-size: 12px;
            width: 200px;
            display: flex;
            justify-content: space-between;
            margin-left: 150px;

            .icon-publishTime {
                width: 12px;
                height: 12px;
                color: #333333;
            }

            .icon-updateTime {
                width: 13px;
                height: 13px;
                color: #333333;
            }
        }
    }

    .info-categoryList {
        display: flex;
        align-items: center;
        margin-top: 30px;
        font-size: 14px;

        .icon {
            margin-right: 5px;
        }

        .category {
            cursor: pointer;
            color: #333333;
            transition: color 0.3s;

            &:hover {
                color: #007fff;
            }
        }
    }

    &::after {
        content: "";
        display: block;
        width: 50%;
        height: 1px;
        background-color: #dbdbdb;
        position: absolute;
        bottom: 0;
    }
}

@media (max-width: 767px) {
    #article-info {
        padding: 15px;
    }
}
</style>
