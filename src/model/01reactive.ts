// 使用ts-node ./src/model/xxx.ts 运行这些文件, 运行前设置一下tsconfig.json => "module": "commonjs"
import { ref, reactive, readonly, toRefs } from "vue";

const a = ref("0");
const data = reactive({
    msg1: "?????",
});
const obj = readonly({
    ob2:{
        p1:"p1"
    },
    p2:"p2"
});

console.log(a.value);
console.log(data.msg1);

// let { msg1 } = data;//解构此 msg1 为一个常量， 不具有响应性 
// let { msg1 } = toRefs(data)// 可以使用toRefs方法唤醒其相应性


// obj.ob2.p1 = "p2"

setTimeout(() => {
    console.log("发生延时改变：");
    a.value = "1";
    // data.msg1 = "!!!!!";
    msg1 = "!!!!!!";
    console.log(a.value);
    console.log(data.msg1);
}, 3000);

// setTimeout
