<template>
    <div id="modal">
        <ShadowShade
            v-if="showShade"
            :opacity="shadeOpacity"
        ></ShadowShade>
        <div class="modalPositionWrap" :style="modalPosition">
            <div class="modalOffsetWrap" :style="modalOffset">
                <transition
                    appear
                    enter-active-class="animate__animated animate__bounceIn"
                >
                    <div class="modalWrap">
                        <div class="modal-head">
                            <div
                                class="modal-title"
                                v-html="modalData.title"
                            ></div>
                            <!-- 关闭（可选） -->
                            <div
                                class="close"
                                v-if="modalData.close !== false"
                                @click="onClickClose"
                            >
                                <SvgIcon name="close1" size="25"></SvgIcon>
                            </div>
                        </div>

                        <div class="modal-content">
                            <p
                                class="content-text"
                                v-html="modalData.content"
                            ></p>
                        </div>

                        <div class="modal-foo">
                            <!-- 模态一：确认 -->
                            <div
                                class="alert btn-group"
                                v-if="modalData.type === 'ALERT'"
                            >
                                <div
                                    class="btn btn-confirm"
                                    @click="onClickConfirm"
                                >
                                    confirm
                                </div>
                            </div>
                            <!-- 模态二：取消 ， 确认 -->
                            <div
                                class="branch btn-group"
                                v-if="modalData.type === 'CONFIRM'"
                            >
                                <div
                                    class="btn btn-cancle"
                                    v-html="cancleText"
                                    @click="onClickCancle"
                                ></div>
                                <div
                                    class="btn btn-confirm"
                                    v-html="confirmText"
                                    @click="onClickConfirm"
                                ></div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { ModalData, FollowElement } from "@/components/modal/modal_type.ts";
import { modalUi } from "@/unit/modelUiUnit";
import SvgIcon from "@/components/svgIcon.vue";
import ShadowShade from "@/components/shadowShade/shadowShade.vue";

export default defineComponent({
    name: "modal",
    components: {
        SvgIcon,
        ShadowShade,
    },
    props: {
        modal: {
            type: Object as PropType<ModalData>,
            required: true,
        },
    },
    setup(props, context) {
        const modalData = computed(() => {
            return props.modal;
        });

        const showShade = computed(() => {
            return modalData.value.shade !== false;
        });

        const shadeOpacity = computed(() => {
            return typeof modalData.value.shade === "boolean"
                ? modalData.value.shade
                    ? 0.5
                    : 0
                : modalData.value.shade;
        });

        const modalPosition = computed(() => {
            let styleSheet = {};
            const follow = modalData.value.position?.follow || "ELEGANCE";

            function getStyleFollowTag(tag: string) {
                switch (tag) {
                    case "LEFT":
                        return {
                            top: "50%",
                            left: "0",
                            transform: `translate(0,-50%)`,
                        };
                    case "TOP":
                        return {
                            top: "0",
                            left: "50%",
                            transform: `translate(-50%,0)`,
                        };
                    case "RIGHT":
                        return {
                            top: "50%",
                            left: "100%",
                            transform: `translate(-100%,-50%)`,
                        };
                    case "BOTTOM":
                        return {
                            top: "100%",
                            left: "50%",
                            transform: `translate(-50%,-100%)`,
                        };
                    case "LEFT-TOP":
                        return {
                            top: "0",
                            left: "0",
                            transform: `translate(0,0)`,
                        };
                    case "LEFT-BOTTOM":
                        return {
                            top: "100%",
                            left: "0",
                            transform: `translate(0,-100%)`,
                        };
                    case "RIGHT-TOP":
                        return {
                            top: "0",
                            left: "100%",
                            transform: `translate(-100%,0)`,
                        };
                    case "RIGHT-BOTTOM":
                        return {
                            top: "100%",
                            left: "100%",
                            transform: `translate(-100%,-100%)`,
                        };
                    case "CENTER":
                        return {
                            top: "50%",
                            left: "50%",
                            transform: `translate(-50%,-50%)`,
                        };
                    case "ELEGANCE":
                        return {
                            top: "40%",
                            left: "50%",
                            transform: `translate(-50%,-50%)`,
                        };

                    default:
                        return {
                            top: 0 + "px",
                            left: 0 + "px",
                            transform: `translate(0,-0)`,
                        };
                }
            }

            function getStyleFollowEl(playload: FollowElement) {
                const {
                    width,
                    height,
                    top,
                    left,
                    bottom,
                } = playload.el.getBoundingClientRect();

                switch (playload.place) {
                    case "LEFT":
                        return {
                            top: top + height / 2 + "px",
                            left: left + "px",
                            transform: `translate(-100%,-50%)`,
                        };
                    case "TOP":
                        return {
                            top: top + "px",
                            left: left + width / 2 + "px",
                            transform: `translate(-50%,-100%)`,
                        };
                    case "RIGHT":
                        return {
                            top: top + height / 2 + "px",
                            left: left + width + "px",
                            transform: `translate(0,-50%)`,
                        };
                    case "BOTTOM":
                        return {
                            top: top + height + "px",
                            left: left + width / 2 + "px",
                            transform: `translate(-50%,0)`,
                        };
                    case "LEFT-TOP":
                        return {
                            top: top + "px",
                            left: left + "px",
                            transform: `translate(-100%,-100%)`,
                        };
                    case "LEFT-BOTTOM":
                        return {
                            top: bottom + "px",
                            left: left + "px",
                            transform: `translate(-100%,0)`,
                        };
                    case "RIGHT-TOP":
                        return {
                            top: top + "px",
                            left: left + width + "px",
                            transform: `translate(0,-100%)`,
                        };
                    case "RIGHT-BOTTOM":
                        return {
                            top: bottom + "px",
                            left: left + width + "px",
                            transform: `translate(0,0)`,
                        };
                    case "CENTER":
                        return {
                            top: bottom - height / 2 + "px",
                            left: left + width / 2 + "px",
                            transform: `translate(-50%,-50%)`,
                        };
                    case "ELEGANCE":
                        return {
                            top: "40%",
                            left: "50%",
                            transform: `translate(-50%,-50%)`,
                        };

                    default:
                        return {
                            top: 0 + "px",
                            left: 0 + "px",
                            transform: `translate(0,-0)`,
                        };
                }
            }

            if (typeof follow === "string") {
                styleSheet = getStyleFollowTag(follow);
            } else {
                if (Object.prototype.toString.call(follow).includes("Array")) {
                    console.log("Array");
                } else {
                    styleSheet = getStyleFollowEl(follow as FollowElement);
                }
            }

            return styleSheet;
        });

        const modalOffset = computed(() => {
            let top = "";
            let left = "";

            const offsetXY = modalData.value.position?.offsetXY || [0, 0];
            top = offsetXY[0] + "px";
            left = offsetXY[1] + "px";

            return {
                top,
                left,
            };
        });

        const cancleText = computed(() => {
            return modalData.value.cancle?.text || "取消";
        });

        const confirmText = computed(() => {
            return modalData.value.confirm?.text || "确认";
        });

        function closeModal() {
            modalUi.hideModal(modalData.value.id);
        }

        function onClickClose() {
            typeof modalData.value.close !== "boolean" &&
                modalData.value.close?.event?.();
            closeModal();
            return;
        }

        function onClickCancle() {
            modalData.value.cancle?.event?.();
            closeModal();
            return;
        }

        function onClickConfirm() {
            modalData.value.confirm?.event?.();
            closeModal();
            return;
        }

        return {
            modalData,
            showShade,
            shadeOpacity,
            modalPosition,
            modalOffset,
            onClickClose,
            cancleText,
            confirmText,
            onClickCancle,
            onClickConfirm,
        };
    },
});
</script>

<style lang="scss">
$defaultColor: #ffffff;
#modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .modalPositionWrap {
        position: fixed;
        display: inline-block;
        pointer-events: none;
        top: 0;
        left: 0;
        height: auto;

        .modalOffsetWrap {
            position: relative;
            display: inline-block;

            .modalWrap {
                background-color: rgba($color: #000000, $alpha: 0.8);
                width: 300px;
                height: auto;
                padding: 10px;
                box-sizing: border-box;
                pointer-events: auto;

                .modal-head {
                    position: relative;
                    height: 25px;
                    background-color: red;

                    .modal-title {
                        position: absolute;
                        color: $defaultColor;
                        height: 25px;
                        text-align: center;
                        line-height: 25px;
                        box-sizing: border-box;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        left: 0;
                        right: 25px;
                        padding-left: 25px;
                    }

                    .close {
                        color: $defaultColor;
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 25px;
                        height: 25px;
                        cursor: pointer;
                        z-index: 999;
                    }
                }

                .modal-content {
                    position: relative;
                    margin-top: 18px;
                    font-size: 14px;

                    .content-text {
                        position: relative;
                        color: $defaultColor;
                        color: red;
                        background-color: yellow;
                        width: 100%;
                    }
                }

                .modal-foo {
                    margin-top: 18px;

                    .btn-group {
                        display: flex;
                        justify-content: center;

                        .btn {
                            font-size: 14px;
                            background-color: red;
                            min-width: 80px;
                            min-height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                        }

                        .btn-cancle {
                            background-color: #eeeeee;
                            color: #333333;
                        }

                        .btn-confirm {
                            background-color: black;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
    }
}
</style>
