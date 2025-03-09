<template>
    <div class="home">
        <div class="slideshow">
            <SlideShow></SlideShow> 
        </div>
        <div class="About_me">
            <AboutMe></AboutMe>
            <div class="cut-container">
                <div class="cut_line" v-motion :initial="{ opacity: 0, x: -200 }"
                :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }"></div>
            </div>
        </div>
        <div class="Personal_works">
            <ProductionShow></ProductionShow>
        </div>
        <div class="course_note">
            <CourseNote></CourseNote>
        </div>
    </div>
</template>

<script setup>
import AboutMe from '../components/AboutMe.vue';
import CourseNote from '../components/CourseNote.vue';
import ProductionShow from '../components/ProductionShow.vue';
import SlideShow from '../components/SlideShow.vue';

</script>

<style scoped>
.About_me{
    margin-top: 10%;
}

.Personal_works{
    margin-top: 5%;
}
.cut-container{
    margin-top: 5%;
    display: flex;
    justify-content: center;
}
.cut_line{
    width: 50%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.304);;
}
</style>