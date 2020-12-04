interface LayoutState {
    showBlurBg: boolean;
    showArticleList: boolean;
    currDate: Date;
}
const state: LayoutState = {
    showBlurBg: false,
    showArticleList: false,
    currDate: new Date()
};

const getters = {};

const actions = {};

const mutations = {
    setState(state: any, data: any) {
        Object.assign(state, data);
    },
    setCurrDate(state: any, date: Date){
        state.currDate = date;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
