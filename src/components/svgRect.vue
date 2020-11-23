<template>
    <i :class="['svg-icon', `svg-icon-${name}`, className]" :style="svgStyle">
        <svg fill="currentColor" aria-hidden="true" class="svgg" width="100%" height="100%">
            <use :xlink:href="iconName" />
        </svg>
    </i>
</template>

<script>
export default {
    name: "SvgRect",
    props: {
        name: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            default: "",
        },
        color: {
            type: String,
        },
    },
    computed: {
        iconName() {
            return `#icon-${this.name}`;
        },
        svgStyle() {
            const { color } = this;
            const style = {};
            color && (style.color = color);
            return style;
        },
    },
    mounted() {
        console.log("mm");
    },
};
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.125em;
  line-height: 0;
  display: inline-block;
}
</style>