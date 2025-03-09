<template>
    <div class="gallery-header">
        <h1 class="gallery-title">{{ title }}</h1>
        <h2 class="gallery-subtitle">{{ subtitle }}</h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'GalleryHeader',
    props: {
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.gallery-header {
    text-align: center;
    margin-bottom: 40px;
}

.gallery-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.gallery-subtitle {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #555;
}
</style>