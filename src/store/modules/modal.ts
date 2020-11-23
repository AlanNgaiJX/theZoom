import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { IndexState } from "@/store/index.ts";
import { ModalData } from "@/components/modal/modal_type.ts";

// const defultModal: ModalData = {
//     state: false,
//     type: "ALERT",
//     title: "modal title",
//     content: "modal content",
//     close: {
//         event: () => {
//             return;
//         },
//     },
//     cancle: {
//         text: "cancle",
//         event: () => {
//             return;
//         },
//     },
//     confirm: {
//         text: "confirm",
//         event: () => {
//             return;
//         },
//     },
// };

interface ModalState {
    modal: any;
}

const state: ModalState = {
    modal: {}
};

const getters: GetterTree<ModalState, IndexState> = {};

const actions: ActionTree<ModalState, IndexState> = {
    setModal({ commit }, modalData: ModalData) {
        commit("setModal", { modalData });
    },
};

const mutations: MutationTree<ModalState> = {
    setState(state: any, data: any) {
        Object.assign(state, data);
    },
    setModal(state: any, { modalData }) {
        Object.assign(state.modal, modalData);
    },
};

const module: Module<ModalState, IndexState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

export default module;
