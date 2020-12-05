<template>
    <div id="clock">
        <div class="two-part">
            <div class="part displayPart">
                <div class="clockWrap">
                    <ClassicClock></ClassicClock>
                </div>
                <div class="btn-group">
                    <div class="btn btn-setting">
                        <SvgIcon name="setting" class="icon"></SvgIcon>
                    </div>
                    <div class="btn btn-alarm">
                        <SvgIcon name="alarm" class="icon"></SvgIcon>
                    </div>
                </div>
            </div>
            <div class="part modulesPart">
                <!-- 倒计时 -->
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { dateFormat } from "@/unit/commonUtils.ts";
import SvgIcon from "@/components/svgIcon.vue";
import ClassicClock from "@/components/clock/classicClock.vue";

export default defineComponent({
    name: "clock",
    components: {
        SvgIcon,
        ClassicClock,
    },
    setup() {
        const store = useStore();
        return {};
    },
});
</script>

<style lang="scss">
#clock {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #eee;

    .two-part {
        display: flex;
        height: 100%;
        background-color: yellow;

        .part {
            box-sizing: border-box;
            border: 1px solid black;
            width: 50%;
            height: 100%;
        }

        .displayPart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: red;

            .clockWrap {
                position: relative;
                width: 60%;
                max-width: 500px;
                background-color: pink;
            }

            .btn-group {
                display: flex;

                .btn {
                    margin: 10px;
                    padding: 10px;
                    cursor: pointer;

                    .icon {
                        color: #fff;
                        width: 20px;
                        height: 20px;
                    }

                    &.active{
                        .icon {
                            color: #007fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
