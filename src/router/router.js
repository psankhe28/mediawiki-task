import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';

const router = createRouter({
    history: createWebHistory(), routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: About
        }
    ]
})

export default router