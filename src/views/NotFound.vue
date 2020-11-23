<template>
    <div id="NotFound">
        <div class="iconNotFound">
            <SvgIcon name="404" className="icon"></SvgIcon>
            <p>
                <span>Sorry...</span><span>page not found. </span
                ><span class="goBack" @click="back">Go back.</span>
            </p>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@/components/svgIcon.vue";

export default {
    name: "NotFound",
    components: {
        SvgIcon,
    },
    methods: {
        back() {this.$router.go(-1)}
    },
};
</script>

<style lang="scss">
#NotFound {
    .iconNotFound {
        position: absolute;
        width: 30%;
        padding-bottom: 15%;
        left: 50%;
        top: 35%;
        transform: translate(-50%, -50%);

        .icon {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        p {
            position: absolute;
            top: 100%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            line-height: 30px;

            .goBack {
                position: relative;
                margin-left: 10px;
                cursor: pointer;

                &:hover {
                    color: royalblue;

                    &::after {
                        background-color: royalblue;
                        width: 100%;
                    }
                }

                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    width: 20%;
                    height: 1px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    background-color: rgb(163, 163, 163);
                    transition: width 0.5s;
                }
            }
        }
    }
}
</style>
