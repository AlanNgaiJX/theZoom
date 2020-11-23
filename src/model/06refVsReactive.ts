import { reactive, ref, watch } from "vue";

const data = reactive({ a: ref("a") });
console.log(data.a);

const data2 = reactive([ref("a")]);
console.log(data2[0].value); //需要使用.value访问

const data3 = ref({
    a: "a",
    obj: {
        a: "a",
    },
});

watch(data3.value, (nv, ov) => {
    //没法捕捉到data3对象内部属性的改变，因为它是通过ref处理的
    console.log("观察到data3发生改变");
    console.log(nv);
});

setTimeout(() => {
    console.log("延迟改变了一下data3");
    console.log(data3.value);
    data3.value.a = "b";
    data3.value.obj.a = "b";
    console.log(data3.value);
}, 1000);

const data4 = reactive({ a: "a", obj: { a: "a" } });

watch(data4, (nv, ov) => {
    console.log("观察到data4发生改变");
    console.log(nv);
});

setTimeout(() => {
    console.log("延迟改变了一下data4");
    console.log(data4);
    data4.a = "b";
    data4.obj.a = "b";
    console.log(data4);
}, 1000);
