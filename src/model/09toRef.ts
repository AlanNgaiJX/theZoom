import { toRef, ref, watch } from "vue";

let obj = {
    a: "a",
    b: {
        b: "b",
        c: "c",
    },
};
const state = ref(obj.a);//传递了obj.a的地址
const state2 = toRef(obj,"a");//传递了obj的地址

obj.a = "1";

console.log(state.value);
console.log(state2.value);


