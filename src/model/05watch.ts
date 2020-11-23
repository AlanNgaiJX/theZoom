import { ref, watch } from "vue";

const count = ref(0);

watch(count, (newValue, oldValue) => {
    console.log(newValue,oldValue);
},{
    // immediate: true,
    // deep: true
});

// const interval = setInterval(()=>{
//     count.value++;
//     if (count.value === 10) {
//         clearInterval(interval);
//     }
// },1000);


const obj = ref({state:false});

watch(obj.value,(newValue, oldValue)=>{
    console.log("nv：",newValue.state);
    console.log("ov：",oldValue.state);    
},{deep:true})

setTimeout(()=>{
    obj.value.state = true;
},1000)
