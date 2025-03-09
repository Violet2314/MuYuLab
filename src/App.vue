<template>
    <div class="body">
        <NavBar></NavBar>
        <div class="top"></div>
        <router-view></router-view>
        <BottomShow></BottomShow>
        <div class="to-top-container">
            <div class="to-top" @click="scrollToTop">
                <div class="icon-wrapper">
                    <img src="../public/images/show_card/向上箭头.svg" alt="回到顶部">
                </div>
                <span class="button-text">回到顶部</span>
            </div>
            <div class="to-service">
                <div class="icon-wrapper">
                    <img src="../public/images/show_card/二维码.svg" alt="客服">
                </div>
                <span class="button-text">客服QQ 周一至周五 11:00-19:00</span>
                <div class="service-content">
                    <img class="qr-code" src="../public/二维码.png" alt="QR码">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BottomShow from './components/BottomShow.vue';
import NavBar from './components/NavBar.vue';

// 回到顶部功能
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<style scoped>
.top {
    width: 100%;
    height: 69px;
    background: black;
}

.to-top-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    bottom: 10vh;
    z-index: 3;
    gap: 8px;
}

.to-top,
.to-service {
    display: flex;
    align-items: center;
    background: #FF8C2F;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.5s ease;
    width: 50px;
    cursor: pointer;
    position: relative;
}

.to-top {
    height: 50px;
    flex-direction: row;
}

.to-service {
    height: 50px;
    flex-direction: column;
    align-items: flex-start;
}

.icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    height: 50px;
    flex-shrink: 0;
}

.to-top .icon-wrapper {
    position: absolute;
    left: 0;
    top: 0;
}

.to-service .icon-wrapper {
    position: absolute;
    left: 0;
    top: 0;
}

.icon-wrapper img {
    width: 24px;
    height: 24px;
}

.button-text {
    color: white;
    white-space: nowrap;
    padding: 0 10px;
    opacity: 0;
    transition: all 0.5s ease;
}

.to-service .button-text{
    margin-top: 12px;
    margin-left: 40px;
}

.to-top .button-text {
    margin-left: 50px;
}

.service-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s ease;
    margin-top: 50px;
    /* 图标的高度 */
    margin-left: 10px;
    width: 100%;
}

.qr-code {
    width: 120px;
    height: 120px;
    margin: 8px 0;
    opacity: 0;
    transition: opacity 0.5s ease;
}

/* 悬停状态 */
.to-top-container:hover .to-top {
    width: 300px;
}

.to-top-container:hover .to-service {
    width: 300px;
    height: 200px;
    /* 向下展开 */
}

.to-top-container:hover .button-text {
    opacity: 1;
}

.to-top-container:hover .service-content {
    opacity: 1;
    max-height: 200px;
    /* 允许内容显示 */
}

.to-top-container:hover .qr-code {
    opacity: 1;
}
</style>