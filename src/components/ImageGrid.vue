<template>
    <div class="image-grid">
        <div v-for="(image, index) in images" :key="index" class="image-item" @click="$emit('image-click', index)">
            <img :src="image.src" :alt="image.alt" class="gallery-image">
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageGrid',
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    emits: ['image-click']
}
</script>

<style scoped>
.image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.image-item {
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s, outline 0.2s;
    box-sizing: border-box;
}

.image-item:hover {
    transform: scale(1.02);
    outline: 5px solid var(--main-hover, rgba(0, 0, 0, 0.1));
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 4/3;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .image-grid {
        grid-template-columns: 1fr;
    }
}
</style>