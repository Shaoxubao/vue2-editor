import Vue from 'vue'
import VueRouter from 'vue-router'
import MyEditor from '../components/MyEditor.vue'
import HomeView from '../views/HomeView.vue'
import News from '../views/News.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: HomeView },
  {
    path: '/newsAdd',
    name: 'myEditor',
    component: MyEditor
  },
  {
    path: '/news',
    name: 'news',
    component: News
  }
]

const router = new VueRouter({
  routes
})

export default router
