import { reactive, ref, toRaw, watch } from "vue";

let obj1 = {
    a: "a",
    b: { b: "b", c: "c" },
};

let state = reactive(obj1);

let obj2 = toRaw(state);

console.log(obj1 === state); // false
console.log(obj1 === obj2); // true

watch(state, (nv) => {
    console.log("发生改变");
});

setTimeout(() => {
    obj2.a = "1";//这样虽然能修改到state.a，但是巧妙地绕开了watcher
    console.log(state.a);
}, 1000);
