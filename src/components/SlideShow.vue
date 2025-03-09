<template>
    <div class="carousel-container">
        <!-- 轮播图主体 -->
        <div class="carousel">
            <!-- 左侧导航按钮 -->
            <button class="nav-button prev" @click="manualSlide('prev')">
                <span class="nav-icon">&lt;</span>
            </button>

            <!-- 轮播内容 -->
            <div class="carousel-track-container">
                <div class="carousel-track" :style="{ transform: `translateX(${-currentPosition}px)` }"
                    @transitionend="handleTransitionEnd" :class="{ 'no-transition': noTransition }">
                    <!-- 为了实现无缝循环，在开头添加最后一张图片的克隆 -->
                    <div class="slide clone" :style="{ width: slideWidth + 'px' }">
                        <img :src="slides[slides.length - 1].image" alt="Last slide" class="slide-image" />
                    </div>

                    <!-- 实际的轮播图片 -->
                    <div v-for="(slide, index) in slides" :key="index" class="slide"
                        :style="{ width: slideWidth + 'px' }">
                        <img :src="slide.image" alt="Slide image" class="slide-image" />

                        <!-- 文字内容带动效 -->
                        <div class="text-overlay" v-if="currentIndex === index">
                            <Transition name="slide-left" appear>
                                <h2 v-if="showText" class="slide-title">{{ slide.title }}</h2>
                            </Transition>

                            <Transition name="slide-right" appear>
                                <p v-if="showText" class="slide-description">{{ slide.description }}</p>
                            </Transition>
                        </div>
                    </div>

                    <!-- 为了实现无缝循环，在末尾添加第一张图片的克隆 -->
                    <div class="slide clone" :style="{ width: slideWidth + 'px' }">
                        <img :src="slides[0].image" alt="First slide" class="slide-image" />
                    </div>
                </div>
            </div>

            <!-- 右侧导航按钮 -->
            <button class="nav-button next" @click="manualSlide('next')">
                <span class="nav-icon">&gt;</span>
            </button>
        </div>

        <!-- 分页指示器 -->
        <div class="pagination">
            <span v-for="(slide, index) in slides" :key="index" :class="['dot', { active: index === currentIndex }]"
                @click="manualSlide('dot', index)"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImprovedCarousel',
    data() {
        return {
            slides: [
                {
                    image: '/images/insets_big/1.jpg',
                    title: '春日物语',
                    description: '轻柔的风，温暖的阳光'
                },
                {
                    image: '/images/insets_big/2.jpg',
                    title: '夏日旅行',
                    description: '探索未知的世界'
                },
                {
                    image: '/images/insets_big/3.jpg',
                    title: 'wok',
                    description: '探索未知的世界'
                },
            ],
            currentIndex: 0,
            currentPosition: 0,
            slideWidth: 800,
            showText: true,
            autoplayInterval: null,
            noTransition: false,
            autoplayDelay: 5000 // 自动播放间隔时间（毫秒）
        }
    },
    mounted() {
        this.initCarousel();
        window.addEventListener('resize', this.updateSlideWidth);
        this.startAutoplay();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateSlideWidth);
        this.stopAutoplay();
    },
    methods: {
        initCarousel() {
            this.updateSlideWidth();
            // 初始位置设置为第一张实际图片（跳过克隆的最后一张）
            this.currentPosition = this.slideWidth;
        },
        updateSlideWidth() {
            const container = document.querySelector('.carousel-track-container');
            if (container) {
                this.slideWidth = container.clientWidth;
                // 更新当前位置以保持当前图片居中
                this.currentPosition = (this.currentIndex + 1) * this.slideWidth;
            }
        },
        // 新增：处理手动滑动的方法，整合了重置计时器的功能
        manualSlide(action, index) {
            // 先停止当前的自动播放
            this.stopAutoplay();

            // 根据操作类型执行相应的滑动
            if (action === 'next') {
                this.nextSlide();
            } else if (action === 'prev') {
                this.prevSlide();
            } else if (action === 'dot') {
                this.goToSlide(index);
            }

            // 重新开始自动播放计时器
            this.startAutoplay();
        },
        nextSlide() {
            this.resetTextAnimation();

            if (this.currentIndex >= this.slides.length - 1) {
                // 先移动到克隆的第一张
                this.currentPosition += this.slideWidth;
                this.currentIndex = 0;

                setTimeout(() => {
                    this.noTransition = true;
                    this.currentPosition = this.slideWidth; // 无缝跳回真正的第一张
                    setTimeout(() => this.noTransition = false, 10);
                }, 500);
            } else {
                this.currentIndex++;
                this.currentPosition = (this.currentIndex + 1) * this.slideWidth;
            }
        },

        prevSlide() {
            this.resetTextAnimation();
            if (this.currentIndex <= 0) {
                // 先移动到克隆的最后一张
                this.currentPosition -= this.slideWidth;
                this.currentIndex = this.slides.length - 1;

                setTimeout(() => {
                    this.noTransition = true;
                    this.currentPosition = this.slides.length * this.slideWidth; // 无缝跳回真正的最后一张
                    setTimeout(() => this.noTransition = false, 10);
                }, 500);
            } else {
                this.currentIndex--;
                this.currentPosition = (this.currentIndex + 1) * this.slideWidth;
            }
        },
        goToSlide(index) {
            this.resetTextAnimation();
            // 计算需要移动的距离
            const diff = index - this.currentIndex;
            this.currentIndex = index;
            this.currentPosition += diff * this.slideWidth;
        },
        handleTransitionEnd() {
            // 处理无缝循环的逻辑
            if (this.currentIndex === 0 && this.currentPosition > this.slideWidth * this.slides.length) {
                // 如果过渡到了克隆的第一张，无缝跳回真正的第一张
                this.noTransition = true;
                this.currentPosition = this.slideWidth;
                // 使用setTimeout确保DOM更新后再移除no-transition类
                setTimeout(() => {
                    this.noTransition = false;
                }, 10);
            } else if (this.currentIndex === this.slides.length - 1 && this.currentPosition < this.slideWidth) {
                // 如果过渡到了克隆的最后一张，无缝跳回真正的最后一张
                this.noTransition = true;
                this.currentPosition = this.slideWidth * this.slides.length;
                setTimeout(() => {
                    this.noTransition = false;
                }, 10);
            }
        },
        resetTextAnimation() {
            this.showText = false;
            setTimeout(() => {
                this.showText = true;
            }, 10);
        },
        startAutoplay() {
            // 确保不会创建多个计时器
            this.stopAutoplay();

            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        },
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }
    }
}
</script>

<style scoped>
.carousel-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
}

.carousel {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 600px;
    height: 73vh;
}

.carousel-track-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.carousel-track.no-transition {
    transition: none;
}

.slide {
    flex-shrink: 0;
    position: relative;
    height: 100%;
}

.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-overlay {
    position: absolute;
    bottom: 20%;
    left: 0;
    width: 100%;
    padding: 0 10%;
    color: white;
    text-align: center;
    z-index: 5;
}

.slide-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-description {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    width: 40px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.nav-button:hover {
    background-color: rgba(0, 0, 0, 0.6);
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}

.nav-icon {
    font-size: 24px;
    font-weight: bold;
}

.pagination {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background-color: var(--main-hover);
}

/* 文字动画效果 */
.slide-left-enter-active {
    animation: slide-in-left 0.8s ease-out both;
}

.slide-right-enter-active {
    animation: slide-in-right 0.8s ease-out both;
}

@keyframes slide-in-left {
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-in-right {
    0% {
        transform: translateX(100px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>