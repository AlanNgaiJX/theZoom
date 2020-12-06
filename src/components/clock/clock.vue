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
                <div class="countdown-module">
                    <div class="countdown-display">
                        <ul class="time-number-setting">
                            <li class="txt hour">{{ timeInSetting.hour }}</li>
                            <li>:</li>
                            <li class="txt">{{ timeInSetting.minute }}</li>
                            <li>:</li>
                            <li class="txt">{{ timeInSetting.second }}</li>
                        </ul>
                        <div class="btn-play-pause">
                            <div class="btn btn-play">
                                <SvgIcon name="play" class="icon"></SvgIcon>
                            </div>
                        </div>
                    </div>
                    <div class="time-setting">
                        <Slider
                            v-model:value="sliderValue"
                            :toFixed="2"
                        ></Slider>
                        <ul class="ruler">
                            <li v-for="item in 10" :key="item"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { dateFormat } from "@/unit/commonUtils.ts";
import SvgIcon from "@/components/svgIcon.vue";
import ClassicClock from "@/components/clock/classicClock.vue";
import Slider from "@/components/formUi/slider.vue";

export default defineComponent({
    name: "clock",
    components: {
        SvgIcon,
        ClassicClock,
        Slider,
    },
    setup() {
        const store = useStore();
        const sliderValue = ref(0);
        const disableSlider = ref(false);
        const minutes = computed(() => {
            return Math.round(90 * sliderValue.value);
        });

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

        return { sliderValue, disableSlider, timeInSetting };
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
            background-color: #dcdcdc;

            .countdown-module {
                width: 400px;
                height: 300px;
                padding: 45px;
                box-sizing: border-box;
                background-color: red;

                .countdown-display {
                    display: flex;
                    justify-content: space-between;

                    .time-number-setting {
                        display: flex;
                        align-items: center;
                        font-size: 40px;
                        width: 220px;
                        background-color: yellow;

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
                        background-color: pink;

                        .btn {
                            width: 50px;
                            height: 50px;
                            background-color: #007aff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 100%;
                            border: 5px solid #c8d4e1;
                        }

                        .btn-play {
                            .icon {
                                color: #fff;
                                width: 25px;
                                height: 25px;
                                cursor: pointer;
                                position: relative;
                                left: 2px;
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
        }
    }
}
</style>
