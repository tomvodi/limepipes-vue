// Composables
import {createRouter, createWebHistory} from 'vue-router'
import MusicSetsView from "@/views/MusicSetsView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: MusicSetsView
  },
  {
    path: '/tunes',
    name: 'tunes',
    component: () => import( '../views/TunesView.vue')
  },
  {
    path: '/hello',
    name: 'hello',
    component: () => import(/* webpackChunkName: "about" */ '../views/HelloWorldView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
