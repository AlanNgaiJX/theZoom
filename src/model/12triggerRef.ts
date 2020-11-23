import { triggerRef, shallowRef, watchEffect } from "vue";

const state = shallowRef({
    a: "a",
    b: {
        b: "b",
        c: "c",
    },
});

watchEffect(() => {
    console.log("检测到发生改变");
    console.log(state.value.a);
    console.log(state.value.b.b);
    console.log(state.value.b.c);
});

// setTimeout(() => {
//     state.value.a = "1";
// }, 1000);

// setTimeout(() => {
//     state.value.b.b = "2";
//     console.log("发生改变");
    
// }, 1500);

setTimeout(() => {
    triggerRef(state);
}, 3000);