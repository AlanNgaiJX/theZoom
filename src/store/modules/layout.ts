interface LayoutState {
    showBlurBg: boolean;
}
const state: LayoutState = {
    showBlurBg: false
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
