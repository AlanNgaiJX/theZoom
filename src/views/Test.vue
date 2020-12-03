<template>
    <div id="Test">
        <!-- <div class="rect" :class="{ show: show }"></div> -->
        <button @click="switchShow">switch</button>
        <input type="number" v-model="input" />
        <ul class="mlist" v-if="show">
            <transition-group
                enter-active-class="animate__animated animate__slideInRight"
            >
                <li class="mitem" v-for="(item,index) in 100" :key="item" v-show="show" :style="{'animation-delay': index * 0.05 + 's'}">
                    {{ item }}
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticleList from "@/components/articleList/articleList.vue";

export default defineComponent({
    name: "Test",
    components: {
        ArticleList,
    },
    data() {
        return {
            show: true,
            input: 0,
        };
    },
    methods: {
        switchShow() {
            this.show = !this.show;
        },
        setStyle(index) {
            return {
                "animation-delay": index * 0.05 + "s",
                "transition-delay": index * 0.1 + "s",
            };
        },
    },
});
</script>

<style lang="scss">
@keyframes theFadeIn {
    0% {
        opacity: 0;
        transform: translateX(150%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
#Test {
    .rect {
        width: 100px;
        height: 100px;
        background-color: red;
        opacity: 0;

        &.show {
            transition: opacity 0.8s;
            opacity: 1;
        }
    }
    .mlist {
        .mitem {
            width: 100px;
            height: 20px;
            background-color: red;
            margin-bottom: 10px;
            // opacity: 0;
            // transform: translateX(150%);
        }

        // .mitem {
        //     opacity: 1;
        //     transform: translateX(0);
        //     transition: transform 2s;
        // }
    }
}
</style>
