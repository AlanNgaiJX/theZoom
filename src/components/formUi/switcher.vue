<template>
    <div
        id="formUi_switcher"
        :class="value ? 'active' : 'default'"
        @click="change"
    >
        <div class="switch-ball"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Switcher",
    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, context) {
        function change() {
            context.emit("update:value", !props.value);
        }
        return { change };
    },
});
</script>

<style lang="scss">
#formUi_switcher {
    width: 50px;
    height: 30px;
    border: 1px solid #aeaeb1;
    border-radius: 1000px;
    box-sizing: border-box;
    position: relative;
    transition: background-color 0.6s;
    cursor: pointer;
    overflow: hidden;

    .switch-ball {
        background-color: #fff;
        border: 1px solid #c4c4c4;
        border-radius: 100%;
        width: 60%;
        padding-bottom: 60%;
        position: absolute;
        box-sizing: border-box;
        top: -1.5px;
        transition: left 0.3s;
    }

    &.default {
        background-color: #e4e7ed;

        .switch-ball {
            left: 0;
        }
    }

    &.active {
        background-color: #007fff;

        .switch-ball {
            left: 40%;
        }
    }
}
</style>
