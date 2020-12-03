<template>
    <div id="glass">
        <div class="drop-shadow">
            <div class="glassRect"></div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#glass {
    .drop-shadow {
        position: fixed;
        height: 100%;
        width: 100%;
        filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.3));
        z-index: 3;
        pointer-events: none;

        .glassRect {
            position: fixed;
            width: 100%;
            height: 100%;
            background-image: url("~@/assets/images/bg/Photo by Dan-Cristian Pădureț (Y5dd6hLkn-8).jpg");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: blur(20px);
            clip-path: inset(10% 10%);
        }

        .content {
            position: fixed;
            top: 10%;
            left: 10%;
            bottom: 10%;
            right: 10%;
            overflow: hidden;
            pointer-events: auto;
        }

        @media screen and (max-width: 500px) {
            .glassRect {
                clip-path: inset(5% 5%);
            }

            .content {
                top: 5%;
                left: 5%;
                bottom: 5%;
                right: 5%;
            }
        }
    }
}
</style>
