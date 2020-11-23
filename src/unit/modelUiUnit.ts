// import { InjectionKey, provide, inject } from "vue";
import { reactive } from "vue";
import {
    ModalData,
    Button,
    OptionButton,
    Position,
} from "@/components/modal/modal_type.ts";
import { ToastData } from "@/components/toast/toast_type.ts";
import { LoadingData, LoadingType } from "@/components/loading/loading_type.ts";

interface ModalUi {
    modalList: Array<ModalData>;
    toastList: Array<ToastData>;
    loading: LoadingData;
    showModal(showModalConfig: ShowModalConfig): void;
    hideModal(id: symbol): void;
    showToast(showToastConfig: ShowToastConfig): void;
    hideToast(id: symbol): void;
    showLoading(showLoading?: ShowLoadingConfig): void;
    hideLoading(): void;
}

// Config
export interface ShowModalConfig {
    type?: "ALERT" | "CONFIRM";
    title: string;
    content: string;
    shade?: number | boolean;
    close?: Button | boolean | null;
    cancle?: OptionButton | null;
    confirm?: OptionButton | null;
    position?: Position | null;
}

export interface ShowToastConfig {
    duration?: number;
    title: string;
}

export interface ShowLoadingConfig {
    type?: LoadingType;
    speed?: number;
    shade?: number | boolean;
    color?: string;
}

export const modalUi: ModalUi = {
    modalList: reactive([]),
    toastList: reactive([]),
    loading: reactive({
        state: false,
        type: "PLANE",
        speed: 1,
        size: 40,
        shade: 0,
        color: "#fff"
    }),

    showModal(showModalConfig: ShowModalConfig) {
        const modalData: ModalData = {
            id: Symbol(),
            state: true,
            type: showModalConfig.type || "ALERT",
            title: showModalConfig.title,
            content: showModalConfig.content,
            shade: showModalConfig.shade || 0,
            close: showModalConfig.close,
            cancle: showModalConfig.cancle || null,
            confirm: showModalConfig.confirm || null,
            position: showModalConfig.position || null,
        };
        this.modalList.push(modalData);
    },

    hideModal(id: symbol) {
        const targetIndex = this.modalList.findIndex(
            (modal) => modal.id === id
        );
        targetIndex > -1 && this.modalList.splice(targetIndex, 1);
    },

    showToast(showToastConfig: ShowToastConfig) {
        const toastData: ToastData = {
            id: Symbol(),
            title: showToastConfig.title,
            duration: showToastConfig.duration || 1000,
        };
        this.toastList.push(toastData);
    },

    hideToast(id: symbol) {
        const targetIndex = this.toastList.findIndex(
            (toast) => toast.id === id
        );
        targetIndex > -1 && this.toastList.splice(targetIndex, 1);
    },

    showLoading(showLoadingConfig: ShowLoadingConfig = {}) {
        this.loading.state = true;
        Object.assign(this.loading, showLoadingConfig);
    },

    hideLoading() {
        this.loading.state = false;
    },
};
