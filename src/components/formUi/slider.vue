<template>
    <div id="formUi_slider">
        <div class="wrap" ref="wrapRef">
            <div
                class="currValue"
                :style="valueStyle"
                ref="currValueRef"
                v-drag="onDrag"
            >
                <div class="controller"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
    name:"slider",
    props: {
        value: {
            type: Number,
            required: true,
        },
        toFixed: {
            type: Number,
            default: 3,
        },
        step:{
            typer: Number,
            default: 0.01
        }
    },
    directives: {
        drag: {
            beforeMount(el, binding) {
                const onDrag = binding.value;
                const startPoint = { x: 0, y: 0 };
                const endPoint = { x: 0, y: 0 };
                const lastPoint = { x: 0, y: 0 };

                function clone(obj) {
                    return JSON.parse(JSON.stringify(obj));
                }

                function onDragMove(e) {
                    const _lastPoint = clone(lastPoint);
                    lastPoint.x = endPoint.x = e.pageX;
                    lastPoint.y = endPoint.y = e.pageY;

                    onDrag(
                        "move",
                        clone({
                            startPoint,
                            endPoint,
                            lastPoint: _lastPoint,
                        })
                    );
                }

                function onDragEnd(e) {
                    const _lastPoint = clone(lastPoint);
                    lastPoint.x = endPoint.x = e.pageX;
                    lastPoint.y = endPoint.y = e.pageY;

                    onDrag(
                        "end",
                        clone({
                            startPoint,
                            endPoint,
                            lastPoint: _lastPoint,
                        })
                    );

                    document.removeEventListener("mousemove", onDragMove);
                    document.removeEventListener("mouseup", onDragEnd);
                }

                function onDragStart(e) {
                    lastPoint.x = startPoint.x = endPoint.x = e.pageX;
                    lastPoint.y = startPoint.y = endPoint.y = e.pageY;

                    onDrag(
                        "start",
                        clone({
                            startPoint,
                            endPoint,
                            lastPoint,
                        })
                    );

                    document.addEventListener("mousemove", onDragMove);
                    document.addEventListener("mouseup", onDragEnd);
                }
                el.addEventListener("mousedown", onDragStart);
            },
        },
    },
    setup(props, context) {
        const wrapRef = ref<HTMLElement | null>(null);
        const currValueRef = ref<HTMLElement | null>(null);
        const currValue = computed(() => {
            return props.value;
        });
        const valueStyle = computed(() => {
            return {
                width: currValue.value * 100 + "%",
            };
        });

        let cacheValue = 0;

        function onDrag(status, { startPoint, endPoint }) {
            if (status === "start") {
                cacheValue = currValue.value;
            }
            if (status === "move") {
                const wrapDom = wrapRef.value;
                const offsetX = endPoint.x - startPoint.x;
                if (wrapDom) {
                    let _currValue = cacheValue + offsetX / wrapDom.offsetWidth;
                    _currValue < 0 && (_currValue = 0);
                    _currValue > 1 && (_currValue = 1);

                    // _currValue = Math.floor(_currValue / props.step) * props.step;

                    _currValue = parseFloat(_currValue.toFixed(props.toFixed));
                    context.emit("update:value", _currValue);
                }
            }
        }
        return { wrapRef, currValueRef, valueStyle, onDrag };
    },
});
</script>

<style lang="scss">
#formUi_slider {
    width: 100%;

    .wrap {
        background-color: #e4e7ed;
        position: relative;
        height: 3px;
        width: 100%;
        border-radius: 5px;

        .currValue {
            background-color: #007fff;
            height: 100%;
            border-radius: 5px;
            position: relative;

            .controller {
                position: absolute;
                right: 0;
                width: 2px;
                transform: translateY(-50%);
                cursor: pointer;

                &::before {
                    content: "";
                    display: block;
                    width: 10px;
                    height: 10px;
                    background-color: black;
                    border-radius: 50%;
                    transform: translate(-40%, 0);
                    border-radius: 50%;
                }
                &::after {
                    content: "";
                    display: block;
                    height: 15px;
                    width: 2px;
                    background-color: black;
                }
            }
        }
    }
}
</style>
