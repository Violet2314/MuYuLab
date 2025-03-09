<template>
    <div class="bottom-show">
        <div class="bottom-show-container" v-motion :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 1000} }">
            <div class="top">
                <div class="main-title">ABOUT US</div>
                <div class="about-us">关于木鱼不花花研究所</div>
                <div class="img-container">
                    <img src="../../public/header.svg" class="img-header">
                </div>
            </div>
            <div class="bottom">
                <p>木鱼不花花研究所由@木鱼不花花于2025年3月9日创建而成</p>
                <p>我们致力于为更多绘画爱好者提供绘画理论基础知识，进阶理论知识与创作思路以及一些技巧分享，根据不同的绘画爱好者，推出更多合适的课程内容</p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.bottom-show {
    background: black;
    height: 250px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom-show-container{
    padding: 0 7%;
    width: clamp(100%, 50vw, 1200px);
    max-width: 1200px;
}

.main-title{
    font-weight: 400;
    font-size: 34px;
    letter-spacing: 10px
}

.about-us{
    font-size: 14px;
}

.bottom{
    margin-top: 40px;
    font-size: 13px;
    font-weight: 300;
    width: 64%;
}

img {
    height: 50px;
    margin-top: 1%;
}
</style>