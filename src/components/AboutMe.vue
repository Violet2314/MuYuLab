<template>
    <div class="about-container">
        <div class="about-content">
            <!-- 头像和名字部分 -->
            <div class="left">
                <div class="profile-section">
                    <div class="avatar-container" v-motion="slideMotion">
                        <img :src="avatarUrl" alt="bro" class="avatar" />
                    </div>
                    <h2 class="name">木鱼不花花</h2>
                    <div class="social-info">
                        <a href="https://space.bilibili.com/61664856/dynamic" class="social-item">
                            <span class="icon">
                                <img src="/Bilibili_logo.svg" alt="Bilibili Logo" class="bilibili" />
                            </span>
                            <span class="link">B站：木鱼不花花</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="right">
                <!-- 关于我部分 -->
                <div class="about-section">
                    <div class="title_container">
                        <h1 class="title" v-motion :initial="{ opacity: 0, x: -100 }"
                            :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }">ABOUT ME</h1>
                    </div>
                    <div class="line" v-motion :initial="{ opacity: 0, x: 200 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }"></div>
                    <div class="subtitle_container" v-motion :initial="{ opacity: 0, x: -70 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }">
                        <h2 class="subtitle">关于 木鱼不花花</h2>
                    </div>


                    <div class="description" v-motion="fadeMotion">
                        <p>大家好，我的个人网站终于搭建完成了，之后会在这里更新我的个人作品、学习经历小传、日常的成长过程和日记。当然，未来这里也会提供我常用的笔刷和动态海报等。</p>

                        <p class="section-title">网站共有5个类别会持续更新：</p>
                        <ul class="section-list">
                            <li>一.首页</li>
                            <li>二.作品展示</li>
                            <li>三.木鱼不花花的笔记--绘画笔记、读书笔记、日常</li>
                            <li>四.课程相关--课程海报、日录、报名相关</li>
                        </ul>
                    </div>
                </div>

                <!-- 音乐播放器部分 -->
                <div class="music-player">
                    <div class="music-info">
                        <span class="music-icon">🎵</span>
                        <span class="music-name">通往夏天的隧道, 再见的出口</span>
                    </div>
                    <div class="player-controls">
                        <button class="play-button" @click="togglePlay">
                            {{ isPlaying ? '暂停' : '播放' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const fadeMotion = {
    initial: { opacity: 0 },
    visibleOnce: { opacity: 1, transition: { duration: 1000 } },

}
const slideMotion = {
    initial: { opacity: 0, x: 220 }, // 初始状态
    visibleOnce: { opacity: 1, x: 0, transition: { duration: 1000 } }, // 进入视口后动画（仅一次）
}

// 定义交集配置，启用 v-intersect 的功能
const intersectOptions = ref({
    enabled: true,     // 启用 v-intersect
    once: true,        // 只触发一次
    callback: () => console.log('元素已进入视口') // 进入视口时的回调
})

const avatarUrl = ref('/header.svg') // 替换为实际的头像URL
const isPlaying = ref(false)
let audio = null

const togglePlay = () => {
    if (!audio) {
        audio = new Audio('/music/wok.mp3') // 替换为实际的音乐文件路径
    }

    if (isPlaying.value) {
        audio.pause()
    } else {
        audio.play()
    }
    isPlaying.value = !isPlaying.value
}

// 组件卸载时清理音频对象
onUnmounted(() => {
    if (audio) {
        audio.pause()
        audio = null
    }
})
</script>

<style scoped>
.bilibili {
    width: 36px;
}

.link {
    display: inline-block;
    transition: all 0.3s;
}

.link:hover {
    color: var(--main-hover);
    transform: scale(1.1);
}

.about-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.about-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 25%;
}

/* 头像部分样式 */
.profile-section {
    text-align: center;
}

.avatar-container {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 0 auto 20px;
    position: relative;
    border: 4px solid #f0f0f0;
    z-index: 200;
}

.avatar-container::after {
    content: "";
    position: absolute;
    top: -30px;
    /* 控制阴影偏移 */
    left: 20px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.113);
    /* 阴影颜色 */
    z-index: 1;
    /* 确保阴影在图片下方 */
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    /* 让 z-index 生效 */
    z-index: 2;
}

.name {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 500;
}

.social-info {
    color: #666;
    font-size: 14px;
    white-space: nowrap;
}

.social-item {
    margin: 5px 0;
    color: #666;
}

.icon {
    margin-right: 8px;
}

/* 关于我部分样式 */
.about-section {
    text-align: center;
    max-width: 800px;
}

.title_container {
    width: 40%;
    text-align: left;
}

.line {
    width: 20%;
    border-bottom: 1.5px solid var(--main-gary);
}

.subtitle_container {
    width: 40%;
    text-align: left;
}

.title {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 3px;
    color: #333;
    position: relative;
}



.subtitle {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
}

.description {
    text-align: left;
    line-height: 1.8;
    font-weight: 200;
    color: #444;
    font-size: 13px;
}

.section-title {
    margin: 20px 0 10px;
}

.section-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.section-list li {
    margin: 10px 0;
    color: #555;
}

/* 音乐播放器样式 */
.music-player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 15px 25px;
    border-radius: 30px;
    margin-top: 40px;
    width: 80%;
    max-width: 400px;
}

.music-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.music-icon {
    font-size: 20px;
}

.music-name {
    font-size: 14px;
    color: #666;
}

.player-controls {
    display: flex;
    align-items: center;
}

.play-button {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.3s ease;
}

.play-button:hover {
    background-color: #eee;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .about-container {
        padding: 20px;
    }

    .avatar-container {
        width: 150px;
        height: 150px;
    }

    .avatar-container::after {
        width: 160px;
        height: 160px;
    }

    .title {
        font-size: 28px;
    }

    .subtitle {
        font-size: 16px;
    }

    .music-player {
        padding: 12px 20px;
    }
}
</style>