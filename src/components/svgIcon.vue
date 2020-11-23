<template>
    <i :class="['svg-icon', `svg-icon-${name}`, className]" :style="svgStyle">
        <svg fill="currentColor" aria-hidden="true" width="100%" height="100%">
            <use :xlink:href="iconName" />
        </svg>
    </i>
</template>

<script>
export default {
    name: "SvgIcon",
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
        size: {//设置size，宽=高
            type: [Number, String],
        },
    },
    computed: {
        iconName() {
            return `#icon-${this.name}`;
        },
        svgStyle() {
            const { color, size } = this;
            const style = {};
            color && (style.color = color);
            size && (style.width = `${size}px`);
            size && (style.height = `${size}px`);
            return style;
        },
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
