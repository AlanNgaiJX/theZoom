<template>
    <div id="clock">
        <div class="timeScreen">{{ time }}</div>
        <ClassicClock></ClassicClock>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { dateFormat } from "@/unit/commonUtils.ts";
import ClassicClock from "@/components/clock/classicClock.vue";

export default defineComponent({
    name: "clock",
    components: {
        ClassicClock,
    },
    setup() {
        const store = useStore();
        const time = computed(() => {
            return dateFormat("HH:MM:SS", store.state.layout.currDate);
        });
        return { time };
    },
});
</script>

<style lang="scss">
#clock {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #eee;
}
</style>
