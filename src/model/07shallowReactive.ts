import { shallowReactive, shallowRef, ref, watch } from "vue";

const shallowState1 = shallowReactive({
    a: "a",
    b: {
        b: "b",
        c: {
            c: "c",
            d: "d",
        },
    },
});

function logState(state: any) {
    console.log(state.a, state.b.b, state.b.c.c, state.b.c.d);
}

setTimeout(() => {
    console.log("浅层，改变shallowState1");
    shallowState1.a = "1";
}, 1000);

setTimeout(() => {
    console.log("深层，改变shallowState1");
    shallowState1.b.b = "2";
    shallowState1.b.c.c = "3";
    shallowState1.b.c.d = "4";
}, 1500);

watch(shallowState1, () => {
    console.log("观察到shallowState1：变化");
    logState(shallowState1)
});



// ================================

const shallowState2 = shallowRef({
    a: "a",
    b: {
        b: "b",
        c: {
            c: "c",
            d: "d",
        },
    },
});

setTimeout(() => {
    console.log("浅层，改变shallowState2");
    shallowState2.value.a = "1";
}, 3000);

setTimeout(() => {
    console.log("深层，改变shallowState2");
    shallowState2.value.b.b = "2";
    shallowState2.value.b.c.c = "3";
    shallowState2.value.b.c.d = "4";
}, 4500);

watch(shallowState2.value, () => {
    console.log("观察到shallowState2：变化");
    logState(shallowState1)
});