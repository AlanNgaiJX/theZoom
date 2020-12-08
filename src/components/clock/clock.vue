<template>
    <div id="clock">
        <div class="two-part">
            <div class="part displayPart" :class="{ half: showModules }">
                <div class="clockWrap">
                    <ClassicClock></ClassicClock>
                </div>
                <div class="btn-group">
                    <div class="btn btn-switch" @click="close">
                        <SvgIcon name="switch" class="icon"></SvgIcon>
                    </div>
                    <div
                        class="btn btn-alarm"
                        @click="swithcShowModules"
                        :class="{ active: showModules }"
                    >
                        <SvgIcon name="alarm" class="icon"></SvgIcon>
                    </div>
                </div>
            </div>
            <div class="part modulesPart" :class="{ half: showModules }">
                <!-- 倒计时 -->
                <Countdown v-if="showModules"></Countdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed} from "vue";
import { useStore } from "vuex";
import SvgIcon from "@/components/svgIcon.vue";
import ClassicClock from "@/components/clock/classicClock.vue";
import Countdown from "@/components/clock/countdown.vue";

export default defineComponent({
    name: "clock",
    components: {
        SvgIcon,
        ClassicClock,
        Countdown,
    },
    setup() {
        const store = useStore();

        // 显示右半部分
        const showModules = computed(() => {
            return store.state.clock.showModules;
        });

        function swithcShowModules() {
            store.commit("clock/_showModules", !showModules.value);
            return;
        }

        function close() {
            store.commit("layout/setState", {
                showBlurBg: false,
                showClock: false,
            });
        }

        return {
            swithcShowModules,
            showModules,
            close,
        };
    },
});
</script>

<style lang="scss">
#clock {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;

    .two-part {
        display: flex;
        height: 100%;

        .part {
            box-sizing: border-box;
            height: 100%;
        }

        .displayPart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            transition: width 1s;

            &.half {
                width: 50%;
            }

            .clockWrap {
                position: relative;
                width: 50%;
                max-width: 300px;
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

                    &.btn-switch {
                        .icon {
                            width: 18px;
                            height: 18px;
                        }
                    }

                    &.active {
                        .icon {
                            color: #007fff;
                        }
                    }
                }
            }
        }

        .modulesPart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 0%;
            transition: width 1s;
            border-left: 1px solid #acacac;

            &.half {
                width: 50%;
            }
        }
    }
}
</style>
