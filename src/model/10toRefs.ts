import {toRefs, reactive} from 'vue';

const state = reactive({
    a:"a",
    b:"b"
})

const refState = toRefs(state);

console.log(refState.a.value);
console.log(refState.b.value);


state.a = '1';
console.log(refState.a.value);

refState.b.value = '2';
console.log(state.b);
