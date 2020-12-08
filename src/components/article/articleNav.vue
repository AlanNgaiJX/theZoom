<template>
    <ul id="article-nav">
        <li class="nav-item" @click="back">
            <SvgIcon name="back" class="icon"></SvgIcon>
        </li>
        <li class="nav-item" @click="home">
            <SvgIcon name="home" class="icon"></SvgIcon>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@/components/svgIcon.vue";

export default defineComponent({
    components: {
        SvgIcon,
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        home() {
            this.$router.push({
                path: "/",
            });
        },
    },
});
</script>

<style lang="scss">
#article-nav {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 900px;
    margin: 0 auto;
    padding: 15px 45px 0px 45px;
    display: flex;
    align-items: center;
    color: #333333;

    &::before {
        content: "[";
        display: block;
    }
    &::after {
        content: "]";
        display: block;
    }

    .nav-item {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 10px;

        &:hover {
            color: #007fff;
        }

        .icon {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
