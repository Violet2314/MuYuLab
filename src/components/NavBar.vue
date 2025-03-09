<template>
    <div class="navbar">
        <div class="navbar-content">
            <div class="logo">
                <router-link :to="'/'" class="icon-header"></router-link>
            </div>
            <div class="nav">
                <router-link :to="'/'">首页</router-link>
                <router-link :to="'/production'">作品</router-link>
                <router-link :to="'/course'">课程</router-link>
                <router-link :to="'/note'">笔记</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.59);
    background: var(--main-black);
    z-index: 1000;
}

.navbar-content{
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    justify-content: space-between;
    padding: 0 8%;
}

.icon-header{
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url('header.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.nav{
    width: 30%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.nav a{
    font-size: 12px;
    color: var(--main-white);
    transition: color 0.3s;
    cursor: pointer;
}

.nav a:hover{
    color: var(--main-hover);
}
</style>