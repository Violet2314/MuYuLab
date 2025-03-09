<template>
    <div v-if="isOpen" class="image-viewer">
        <!-- 半透明黑色背景 -->
        <div class="viewer-backdrop" @click="$emit('close')"></div>

        <!-- 查看器内容 -->
        <div class="viewer-content">
            <!-- 顶部标题和关闭按钮 -->
            <div class="viewer-header">
                <div class="viewer-title">{{ currentImage.title || 'Image Viewer' }}</div>
                <button class="viewer-close" @click="$emit('close')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- 左侧导航按钮 -->
            <button class="nav-button nav-prev" @click.stop="$emit('prev')">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <!-- 主图片 -->
            <div class="viewer-image-container">
                <img :src="currentImage.src" :alt="currentImage.alt" class="viewer-image"
                    :style="{ transform: `scale(${zoomLevel / 100})` }">
            </div>

            <!-- 右侧导航按钮 -->
            <button class="nav-button nav-next" @click.stop="$emit('next')">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            <!-- 底部控制栏 -->
            <div class="viewer-controls">
                <!-- 缩放控制 -->
                <div class="zoom-controls">
                    <button class="zoom-button" @click="$emit('zoom-out')" :disabled="zoomLevel <= 50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    <span class="zoom-level">{{ zoomLevel }}%</span>
                    <button class="zoom-button" @click="$emit('zoom-in')" :disabled="zoomLevel >= 200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                </div>

                <!-- 缩略图导航 -->
                <div class="thumbnail-container">
                    <div v-for="(image, index) in images" :key="index"
                        :class="['thumbnail', { active: currentIndex === index }]" @click="$emit('set-image', index)">
                        <img :src="image.src" :alt="image.alt">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageViewer',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        images: {
            type: Array,
            required: true
        },
        currentIndex: {
            type: Number,
            default: 0
        },
        zoomLevel: {
            type: Number,
            default: 100
        }
    },
    computed: {
        currentImage() {
            return this.images[this.currentIndex] || {};
        }
    },
    emits: ['close', 'prev', 'next', 'zoom-in', 'zoom-out', 'set-image']
}
</script>

<style scoped>
/* 图片查看器样式 */
.image-viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.viewer-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
}

.viewer-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 1001;
}

.viewer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    color: white;
}

.viewer-title {
    font-size: 1.2rem;
    font-weight: 500;
}

.viewer-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.viewer-close:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.viewer-image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.viewer-image {
    max-height: calc(100vh - 200px);
    max-width: 90%;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    opacity: 0.7;
    cursor: pointer;
    padding: 10px;
    z-index: 1002;
    transition: opacity 0.2s;
}

.nav-button:hover {
    opacity: 1;
}

.nav-prev {
    left: 20px;
}

.nav-next {
    right: 20px;
}

.viewer-controls {
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
}

.zoom-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
}

.zoom-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.zoom-button:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.1);
}

.zoom-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.zoom-level {
    margin: 0 10px;
    font-size: 0.9rem;
}

.thumbnail-container {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding: 5px 0;
    justify-content: center;
}

.thumbnail {
    width: 60px;
    height: 60px;
    border: 2px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s;
}

.thumbnail:hover {
    opacity: 1;
}

.thumbnail.active {
    border-color: white;
    opacity: 1;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .viewer-image {
        max-width: 95%;
    }

    .nav-button svg {
        width: 36px;
        height: 36px;
    }
}
</style>