<template>
    <div class="carousel-container">
        <!-- Header Section -->
        <div class="carousel-header" v-motion :initial="{ opacity: 0}"
        :visible-once="{ opacity: 1, transition: { duration: 1000 } }">
            <h1 class="title">Personal works</h1>
            <h2 class="subtitle">个人作品</h2>
        </div>

        <div class="images-container">
            <!-- Carousel Section -->
            <div class="carousel-wrapper">
                <!-- Images with fade transition -->
                <div class="carousel-images">
                    <transition-group name="fade">
                        <div v-for="(image, index) in images" :key="image.id" v-show="currentIndex === index"
                            class="carousel-image">
                            <img :src="image.src" :alt="image.alt">
                            <div class="image-caption" v-if="image.caption">{{ image.caption }}</div>
                        </div>
                    </transition-group>
                </div>

                <!-- Navigation Arrows -->
                <button class="nav-button prev" @click="prevSlide" aria-label="Previous slide">
                    <i class="arrow left"></i>
                </button>
                <button class="nav-button next" @click="nextSlide" aria-label="Next slide">
                    <i class="arrow right"></i>
                </button>

                <!-- Navigation Dots -->
                <div class="carousel-dots">
                    <button v-for="(dot, index) in images" :key="'dot-' + dot.id"
                        :class="['dot', { active: currentIndex === index }]" @click="goToSlide(index)"
                        :aria-label="`Go to slide ${index + 1}`"></button>
                </div>
            </div>

            <!-- More Link -->
            <div class="more-link">
                <router-link to="/production">
                    <span class="arrow-icon">></span> 更多
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Sample images data - replace with your actual images
const images = ref([
    {
        id: 1,
        src: '/images/insets_big/1.jpg', // Replace with your actual image path
        alt: 'Anime character illustration',
        caption: '造型班v.2'
    },
    {
        id: 2,
        src: '/images/insets_big/2.jpg',
        alt: 'Artwork 2',
        caption: '个人作品 2023'
    },
    {
        id: 3,
        src: '/images/insets_big/3.jpg',
        alt: 'Artwork 3',
        caption: '设计作品集'
    },
]);

const currentIndex = ref(0);
let autoplayInterval = null;

// Navigation methods
const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const goToSlide = (index) => {
    currentIndex.value = index;
};

// Setup autoplay
const startAutoplay = () => {
    stopAutoplay(); // Clear any existing interval first
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 3000); // Change slide every 3 seconds
};

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
};

// Pause autoplay on hover
const pauseAutoplay = () => {
    stopAutoplay();
};

const resumeAutoplay = () => {
    startAutoplay();
};

// Lifecycle hooks
onMounted(() => {
    startAutoplay();

    // Add event listeners to pause on hover
    const container = document.querySelector('.carousel-wrapper');
    if (container) {
        container.addEventListener('mouseenter', pauseAutoplay);
        container.addEventListener('mouseleave', resumeAutoplay);
    }
});

onBeforeUnmount(() => {
    stopAutoplay();

    // Clean up event listeners
    const container = document.querySelector('.carousel-wrapper');
    if (container) {
        container.removeEventListener('mouseenter', pauseAutoplay);
        container.removeEventListener('mouseleave', resumeAutoplay);
    }
});
</script>

<style scoped>
.carousel-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

.carousel-header {
    text-align: center;
    margin-bottom: 2rem;
}

.images-container{
    padding: 3% 2%;
    border: 1px solid var(--main-gary);
}

.title {
    font-size: 3rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.subtitle {
    font-size: 1.5rem;
    color: #666;
    font-weight: 400;
}

.carousel-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.carousel-images {
    position: relative;
    width: 100%;
    height: 600px;
    /* Adjust based on your needs */
}

.carousel-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.carousel-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.image-caption {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 1rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Navigation buttons */
.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    z-index: 10;
}

.nav-button:hover {
    background-color: rgba(255, 255, 255, 0.9);
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}

.arrow {
    border: solid #333;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 4px;
}

.right {
    transform: rotate(-45deg);
}

.left {
    transform: rotate(135deg);
}

/* Navigation dots */
.carousel-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background-color: white;
}

/* More link */
.more-link {
    text-align: center;
    margin-top: 1rem;
}

.more-link a {
    display: inline-flex;
    align-items: center;
    color: #3498db;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;
}

.more-link a:hover {
    color: #075385;
}

.arrow-icon {
    margin-right: 5px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1.2rem;
    }

    .carousel-images {
        height: 400px;
    }

    .nav-button {
        width: 35px;
        height: 35px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 2rem;
    }

    .carousel-images {
        height: 300px;
    }

    .nav-button {
        width: 30px;
        height: 30px;
    }

    .image-caption {
        font-size: 0.9rem;
        padding: 6px 12px;
    }
}
</style>