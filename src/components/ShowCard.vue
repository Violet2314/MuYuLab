<template>
    <div class="show-card" >
        <div class="card-container" >
            <div class="img-container" v-motion :initial="{ opacity: 0,x: 200}"
            :visible-once="{ opacity: 1,x:0, transition: { duration: 1000} }">
                <img :src="props.img" alt="">
            </div>
            <div class="title" v-motion :initial="{ opacity: 0,x: 200}"
            :visible-once="{ opacity: 1,x:0, transition: { duration: 1000} }">{{ props.title }}</div>
            <p class="container" v-motion :initial="{ opacity: 0,x: 200}"
            :visible-once="{ opacity: 1,x:0, transition: { duration: 1000} }">{{ props.describle }}</p>
            <router-link :to="props.link" class="button" v-motion :initial="{ opacity: 0,x: 200}"
            :visible-once="{ opacity: 1,x:0, transition: { duration: 1000} }" :style="{ background: getButtonColor }">{{ props.linkShow }}</router-link>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    describle: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    linkShow: {
        type: String,
        default: '了解更多'
    }
});

const getButtonColor = computed(() => {
    const link = props.link;
    if(link == '') return '#666666';
    return 'var(--main-hover)'; // 默认颜色
});
</script>

<style scoped>
.show-card{
    width: 100%;
    flex-grow: 1;
    background: var(--main-card);
    border-radius: 5%;
    position: relative;
    padding-bottom: 3%;
    transition: all 0.3s;
}

.show-card:hover{
    transform: translateY(-5px);
    background: #f1f0ef;
}

.card-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 7%;
    margin: 13% 7%;
}

.title{
    margin-top: 10%;
    color: black;
    font-weight: 600;
    font-size: 17px;
}

.container{
    margin-top: 5%;
    color: rgba(0, 0, 0, 0.588);
    font-weight: 300;
    font-size: 14px;
}

.button{
    color: rgba(255, 255, 255, 0.768);
    bottom: 10%;
    position: absolute;
    padding: 2% 18%;
    transition: all 0.3s;
}

.button:hover{
    color: white;
    font-weight: 600;
}

img {
    width: 50%;
}
</style>