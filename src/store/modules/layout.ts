interface LayoutState {
    showBlurBg: boolean;
    showArticleList: boolean;
    showClock: boolean;
}
const state: LayoutState = {
    showBlurBg: false,
    showArticleList: false,
    showClock: false,
};

const getters = {};

const actions = {};

const mutations = {
    setState(state: any, data: any) {
        Object.assign(state, data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
