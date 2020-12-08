import { showNotification } from "@/unit/commonUtils.ts";

interface ClockState {
    sliderValue: number;
    isCountdowning: boolean;
    secondInCounting: number;
    countdownInterval: number;
    showModules: boolean;
}
const state: ClockState = {
    sliderValue: 0,
    isCountdowning: false,
    secondInCounting: 0,
    countdownInterval: 0,
    showModules: false,
};

const getters = {};

const actions = {
    // 停止倒数
    pauseCountdown({ state, commit }) {
        commit("_isCountdowning", false);
        clearInterval(state.countdownInterval);
    },

    // 开始倒数
    playCountdown({ state, commit, dispatch }, secondInCounting) {
        commit("_secondInCounting", secondInCounting);
        commit("_isCountdowning", true);
        const countdownInterval = setInterval(function() {
            const newSecondInCounting = state.secondInCounting - 1;
            commit("_secondInCounting", newSecondInCounting);
            if (state.secondInCounting === 0) {
                dispatch("pauseCountdown");
                dispatch("timesup");
            }
        }, 1000);
        commit("_countdownInterval", countdownInterval);
    },

    // 倒数到时
    timesup() {
        showNotification("Times up!!");
        const ae = new Audio(require("@/assets/media/Sonar.mp3"));
        ae.loop = false;
        ae.addEventListener("canplaythrough", () => {
            ae.play();
        });
    },
};

const mutations = {
    _sliderValue(state: any, sliderValue: number) {
        state.sliderValue = sliderValue;
    },
    _isCountdowning(state: any, isCountdowning: string) {
        state.isCountdowning = isCountdowning;
    },
    _secondInCounting(state: any, secondInCounting: number) {
        state.secondInCounting = secondInCounting;
    },
    _countdownInterval(state: any, countdownInterval: number) {
        state.countdownInterval = countdownInterval;
    },
    _showModules(state: any, showModules: boolean) {
        state.showModules = showModules;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
