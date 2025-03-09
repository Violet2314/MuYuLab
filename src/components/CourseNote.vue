<template>
    <div class="parallax-container">
        <!-- Background Wrapper (Now content-wrapper has the parallax effect) -->
        <div class="content-wrapper parallax-bg" :style="backgroundStyle">
            <!-- Header Section -->
            <div class="courese-show">
                <div class="courese-show-header">
                    <div class="title">木鱼不花花研究所</div>
                    <div class="show">
                        <p>课程相失的内容在此。24年休息了一整年，学习，重新整理课纲。</p>
                        <p>虽然大家很喜欢我的插画，但上课来说，我最擅长的内容是前期的基础课程。</p>
                        <p>但因为大家的期待，我一定不会停下学习的脚步，争取越来越好。</p>
                    </div>
                    <div class="img-container">
                        <img src="../../public/header.svg" alt="">
                    </div>
                </div>
                <div class="courses">
                    <div class="course-container" v-motion :initial="{ opacity: 0,x: -200}"
                    :visible-once="{ opacity: 1,x:0, transition: { duration: 1000} }">
                        <ShowCard :img="'images/show_card/文件夹.svg'" :title="'零基础入门班'" :describle="'针对零基础、入门级的二次元限高课程，录播在售中'" :link="''" :linkShow="'暂未开启'" ></ShowCard>
                        <ShowCard :img="'images/show_card/画画.svg'" :title="'进阶造型班'" :describle="'针对已有一定绘画基础，向二次元商业美术方向进阶的课程'" :link="''" :linkShow="'暂未开启'"></ShowCard>
                        <ShowCard :img="'images/show_card/图片.svg'" :title="'猛猛画插画班第二期'" :describle="'课程分为基础2D、3D录播、进阶横版插画课，将于24年底研发完成'" :link="''" :linkShow="'暂未开启'"></ShowCard>
                        <ShowCard :img="'images/show_card/聊天.svg'" :title="'作业修改展示'" :describle="'学习成果展示'" :link="''" :linkShow="'暂未开启'"></ShowCard>
                    </div>
                </div>
            </div>
            <div class="speak-some">
                <div class="header-section">
                    <div class="header-content" v-motion :initial="{ opacity: 0 }"
                    :visible-once="{ opacity: 1, transition: { duration: 1000} }">
                        <h1 class="main-title">{{ title }}</h1>
                        <p class="subtitle">{{ subtitle }}</p>
                    </div>
                </div>
                <div class="speak-card-container" v-motion :initial="{ opacity: 0, y: 150 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000 } }">
                    <div class="speak-card">
                        <div class="left">
                            <div class="left-container">
                                <div class="big-title">绘画笔记</div>
                                <div class="small-title">Painting Notes</div>
                                <p>这里我会站在初学者的角度详细的记录学习路径和成长心得也会用文字部分分享正在学习的书籍,观后感等</p>
                            </div>
                        </div>
                        <div class="right">
                            <div class="first-title">目录</div>
                            <div class="second-title">绘画笔记</div>
                            <ul class="list">
                                <li>01 关于手部结构的专项练习</li>
                                <li>02 黑白构成的专项练习</li>
                                <li>03 静物素描练习</li>
                                <li>04 更加深入的感受人体气质的速写学习</li>
                            </ul>
                            <div class="second-title">其他笔记</div>
                            <ul class="list">
                                <li>01 确认目的再选择表现手法</li>
                                <li>02 画面中的个体特质表现</li>
                                <li>03 《人物的解刨》读书笔记和摘录</li>
                                <li>04 插画中的基础知识如何表现</li>
                            </ul>
                        </div>
                        <router-link to="/note" class="get-more">>阅读全文</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import ShowCard from './ShowCard.vue';
import { Link } from 'lucide-vue-next';

const props = defineProps({
    isCourseSection: { type: Boolean, default: false },
    backgroundImage: { type: String, default: '/images/insets_big/3.jpg' },
    title: { type: String, default: '木鱼不花花的文字记录' },
    subtitle: { type: String, default: '其实我是话痨来着，自己开个地方来推文字吧！' },
});

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${props.backgroundImage})`
}));
</script>

<style scoped>
.courses{
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.course-container{
    margin: 0 10px;
    max-width: 1100px;
    display: flex;
    gap: 1.2%;
}

.courese-show{
    padding-top: 30px;
    position: relative;
    z-index: 3;
    color: white;
}

.courese-show-header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.img-container img{
    width: 40px;
}

.title{
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 1%;
}

.show p{
    font-weight: 300;
    font-size: 14px;
    margin: 1px;
}

.show{
    margin-bottom: 1%;
}

.speak-some{
    padding-bottom: 110px;
}

.get-more{
    position: absolute;
    right: 6%;
    bottom: 6%;
    color: #3498db;
    transition: all 0.3s;
}

.get-more:hover{
    font-size: 18px;
    color: #075385;
}

.parallax-container {
    position: relative;
    overflow: hidden;
}

.content-wrapper {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.content-wrapper::after {
    content: "";
    /* 必须设置content属性 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 0;
    /* 确保在背景之上，内容之下 */
}

.left-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.header-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.speak-card-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    padding: 0 10px;
}

.speak-card {
    padding: 3% 1%;
    border-radius: 10px;
    width: clamp(100%, 50vw, 1200px);
    max-width: 1200px;
    max-height: 370px;
    background: var(--main-card);
    display: flex;
    position: relative;
    transition: all 0.3s;
}

.speak-card:hover{
    transform: translateY(-5px);
    background: #f1f0ef;
}

.left {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5%;
    font-size: 13px;
    font-weight: 300;
}

.big-title {
    font-weight: bold;
    font-size: 44px;
    color: rgb(75, 67, 67);
}

.right {
    width: 33%;
    font-size: 13px;
    font-weight: 300;
}

.list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.first-title {
    color: rgb(75, 67, 67);
    font-weight: bold;
    font-size: 16px;
}


.second-title {
    margin-top: 3%;
    font-weight: bold;
    color: rgb(75, 67, 67);
}

.parallax-bg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.header-content {
    text-align: center;
    color: white;
    padding: 2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.main-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .header-section {
        height: 50vh;
    }

    .main-title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1.2rem;
    }
}

@supports (-webkit-overflow-scrolling: touch) {
    .parallax-bg {
        background-attachment: scroll;
    }
}
</style>