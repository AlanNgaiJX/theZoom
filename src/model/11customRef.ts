import { customRef } from "vue";

const state = customRef((track, trigger) => {
    let value = "a";
    return {
        get() {
            // track();
            return value;
        },
        set(newValue: string) {
            // trigger();
            value = newValue;
        },
    };
});

console.log(state.value);
state.value = "b";
console.log(state.value);
