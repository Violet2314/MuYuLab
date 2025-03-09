import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/css/color.css'
import { MotionPlugin } from '@vueuse/motion'

createApp(App).use(router).use(MotionPlugin).mount('#app')
