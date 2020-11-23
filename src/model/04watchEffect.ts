// watchEffect没看懂，似乎有很多神秘功能等待挖掘
import {ref, watchEffect} from "vue";

const count = ref(1);

const stop = watchEffect((onInvalidate)=>{
    console.log(count.value);
    // onInvalidate(()=>{
    //     console.log("onInvalidate");
    // })
})

const interval = setInterval(()=>{
    count.value++;
    if (count.value === 10) {
        stop();
        clearInterval(interval);
    }
},1000);