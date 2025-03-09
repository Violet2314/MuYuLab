<template>
    <div class="image-gallery">
        <!-- 标题部分 -->
        <GalleryHeader title="《The Mockingbird》" subtitle="路过人间">
            <p class="gallery-description">
                个人原创绘画作品。目前还在插画方向的探索阶段，不是只有人物插画，计划会有漫画和其他类型的方式来完善这个故事。但是因为并非全职自由创作，更新速度较慢。也很期待和享受这个本知的探索过程。
            </p>
            <p class="gallery-description">
                文字部分也许会带着我想感悟的情感，对生活的所想所想，但我觉得不是每个人都会喜欢，我也认为故事就是故事，而非完全的个人抒发工具。
            </p>
            <p class="gallery-description">
                如果只是欣赏画作，在这个页面浏览即可，如果对画面背后的故事也感兴趣，欢迎浏览完整的作品页面。（这个页面会在文字和漫画两部分后开放）
            </p>
        </GalleryHeader>

        <!-- 图片网格 -->
        <ImageGrid :images="images" @image-click="openViewer" />

        <!-- 图片查看器 -->
        <ImageViewer :is-open="isViewerOpen" :images="images" :current-index="currentIndex" :zoom-level="zoomLevel"
            @close="closeViewer" @prev="prevImage" @next="nextImage" @zoom-in="zoomIn" @zoom-out="zoomOut"
            @set-image="setCurrentImage" />
    </div>
</template>

<script>
import GalleryHeader from '../components/GalleryHeader.vue';
import ImageGrid from '../components/ImageGrid.vue';
import ImageViewer from '../components/ImageViewer.vue';

export default {
    name: 'ImageGallery',
    components: {
        GalleryHeader,
        ImageGrid,
        ImageViewer
    },
    data() {
        return {
            isViewerOpen: false,
            currentIndex: 0,
            zoomLevel: 100,
            images: [
                {
                    src: "/images/insets_big/1.jpg",
                    alt: "Anime character in white dress with orange elements",
                    title: "The Mockingbird - Scene 1"
                },
                {
                    src: "/images/insets_big/2.jpg",
                    alt: "Character sitting among mushrooms and plants",
                    title: "The Mockingbird - Scene 2"
                },
                {
                    src: "/images/insets_big/3.jpg",
                    alt: "Character in indoor setting",
                    title: "The Mockingbird - Scene 3"
                },
                {
                    src: "/images/insets_big/3.jpg",
                    alt: "Character in garden setting",
                    title: "The Mockingbird - Scene 4"
                },
                {
                    src: "/images/insets_big/3.jpg",
                    alt: "Character in indoor setting",
                    title: "The Mockingbird - Scene 3"
                },
                {
                    src: "/images/insets_big/3.jpg",
                    alt: "Character in indoor setting",
                    title: "The Mockingbird - Scene 3"
                },
                {
                    src: "/images/insets_big/3.jpg",
                    alt: "Character in indoor setting",
                    title: "The Mockingbird - Scene 3"
                },
            ]
        };
    },
    methods: {
        openViewer(index) {
            this.currentIndex = index;
            this.isViewerOpen = true;
            document.body.style.overflow = 'hidden';
            this.addKeyboardListeners();
        },
        closeViewer() {
            this.isViewerOpen = false;
            document.body.style.overflow = '';
            this.removeKeyboardListeners();
            this.zoomLevel = 100;
        },
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        setCurrentImage(index) {
            this.currentIndex = index;
        },
        zoomIn() {
            this.zoomLevel = Math.min(this.zoomLevel + 25, 200);
        },
        zoomOut() {
            this.zoomLevel = Math.max(this.zoomLevel - 25, 50);
        },
        handleKeyDown(e) {
            if (e.key === 'Escape') this.closeViewer();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        },
        addKeyboardListeners() {
            window.addEventListener('keydown', this.handleKeyDown);
        },
        removeKeyboardListeners() {
            window.removeEventListener('keydown', this.handleKeyDown);
        }
    },
    beforeUnmount() {
        this.removeKeyboardListeners();
    }
};
</script>

<style scoped>
.image-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.gallery-description {
    font-size: 0.9rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto 10px;
    line-height: 1.6;
}
</style>