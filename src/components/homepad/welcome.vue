<template>
    <div id="welcome">
        <h1 class="blogName">Alan's blog</h1>
        <p class="greet">" Welcome ."</p>
    </div>
</template>

<style lang="scss">
#welcome {
    color: #fff;
    margin: 0 15px;
    display: inline-block;
    height: 80px;
    vertical-align:top;

    .blogName {
        font-size: 30px;
        text-shadow: 2px 2px 5px #000;
        letter-spacing: 3px;
    }

    .greet {
        text-align: end;
        margin-top: 10px;
        text-shadow: 1px 1px 2px #000;
    }
}
</style>
