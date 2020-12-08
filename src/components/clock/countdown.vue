<template>
    <div class="countdown-module">
        <div class="countdown-display">
            <!-- 设置时的时间 -->
            <ul
                class="time-number-setting display-content"
                v-if="!isCountdowning"
            >
                <li class="txt hour">{{ timeInSetting.hour }}</li>
                <li>:</li>
                <li class="txt">{{ timeInSetting.minute }}</li>
                <li>:</li>
                <li class="txt">{{ timeInSetting.second }}</li>
            </ul>

            <!-- 倒数时的时间 -->
            <ul class="time-number-counting display-content" v-else>
                <li class="txt hour">{{ timeInCounting.hour }}</li>
                <li>:</li>
                <li class="txt">{{ timeInCounting.minute }}</li>
                <li>:</li>
                <li class="txt">{{ timeInCounting.second }}</li>
            </ul>

            <!-- 开始与暂停按钮 -->
            <div class="btn-play-pause">
                <div
                    class="btn btn-play"
                    :class="{ disable: playBtnDisable }"
                    @click="playCountdown"
                    v-if="!isCountdowning"
                >
                    <SvgIcon name="play" class="icon"></SvgIcon>
                </div>
                <div class="btn btn-pause" @click="pauseCountdown" v-else>
                    <SvgIcon name="pause" class="icon"></SvgIcon>
                </div>
            </div>
        </div>

        <!-- 时间设置条 -->
        <div class="time-setting">
            <Slider
                v-model:value="sliderValue"
                :toFixed="2"
                :disable="isCountdowning"
            ></Slider>
            <ul class="ruler">
                <li v-for="item in 10" :key="item"></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import SvgIcon from "@/components/svgIcon.vue";
import Slider from "@/components/formUi/slider.vue";

export default defineComponent({
    components: {
        SvgIcon,
        Slider,
    },
    setup() {
        const store = useStore();

        // slider控件的值
        const sliderValue = computed({
            get: () => store.state.clock.sliderValue,
            set: (value) => {
                store.commit("clock/_sliderValue", value);
            },
        });

        // slider控件的值转分钟
        const minutes = computed(() => {
            return Math.round(90 * sliderValue.value);
        });

        // 0 minutes 时 play按钮disable
        const playBtnDisable = computed(() => {
            return minutes.value === 0;
        });

        // slider控件的分钟格式化为 hour: minute: second
        const timeInSetting = computed(() => {
            const hour = Math.floor(minutes.value / 60);
            const minute = minutes.value % 60;
            const hourTxt = hour + "";
            const minuteTxt = minute < 10 ? "0" + minute : minute + "";
            const secondTxt = "00";

            return {
                hour: hourTxt,
                minute: minuteTxt,
                second: secondTxt,
            };
        });

        // 是否正在倒数
        const isCountdowning = computed(() => {
            return store.state.clock.isCountdowning;
        });

        // 正在倒数的时间
        const timeInCounting = computed(() => {
            const seconds = store.state.clock.secondInCounting;
            const hour = Math.floor(seconds / 60 / 60);
            const minute = Math.floor((seconds % (60 * 60)) / 60);
            const second = seconds - hour * 60 * 60 - minute * 60;

            const hourTxt = hour + "";
            const minuteTxt = minute < 10 ? "0" + minute : minute + "";
            const secondTxt = second < 10 ? "0" + second : second + "";

            return {
                hour: hourTxt,
                minute: minuteTxt,
                second: secondTxt,
            };
        });

        // 停止倒数
        function pauseCountdown() {
            store.dispatch("clock/pauseCountdown");
        }

        // 开始倒数
        function playCountdown() {
            if (playBtnDisable.value) return;
            store.dispatch("clock/playCountdown", minutes.value * 60);
        }

        return {
            // data & computed
            sliderValue,
            isCountdowning,
            timeInSetting,
            timeInCounting,
            playBtnDisable,
            // methods
            playCountdown,
            pauseCountdown,
        };
    },
});
</script>

<style lang="scss">
.countdown-module {
    width: 400px;
    height: 300px;
    padding: 45px;
    box-sizing: border-box;

    .countdown-display {
        display: flex;
        justify-content: space-between;

        .display-content {
            display: flex;
            align-items: center;
            font-size: 40px;
            width: 220px;
            color: #fff;
            text-shadow: 1px 1px 2px #000;

            .txt {
                width: 55px;
                text-align: center;

                &.hour {
                    text-align: end;
                    margin-right: 5px;
                }
            }
        }

        .btn-play-pause {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;

            .btn {
                width: 50px;
                height: 50px;
                background-color: #007aff;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                border: 5px solid #c8d4e1;
                cursor: pointer;
                transition: background-color 0.8s;

                .icon {
                    color: #fff;
                    width: 25px;
                    height: 25px;
                    position: relative;
                }
            }

            .btn-play {
                .icon {
                    left: 2px;
                }

                &.disable {
                    background-color: #78868d;
                    cursor: auto;
                }
            }
        }
    }

    .time-setting {
        height: 50px;
        margin-top: 40px;

        .ruler {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 2px;
            position: relative;
            left: -1px;
            counter-reset: item -1;

            li {
                display: block;
                height: 5px;
                border-left: 1px solid #78868d;
                position: relative;
                counter-increment: item;

                &:nth-child(3n + 1) {
                    height: 10px;

                    &::after {
                        content: counter(item) "0";
                        display: block;
                        width: 11px;
                        height: 15px;
                        position: absolute;
                        left: -5px;
                        bottom: -18px;
                        font-size: 12px;
                        line-height: 15px;
                        text-align: center;
                        color: #78868d;
                    }
                }
                &:nth-child(1) {
                    &::after {
                        content: counter(item);
                    }
                }
            }
        }
    }
}
</style>
