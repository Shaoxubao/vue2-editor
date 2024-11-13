import Vue from 'vue'
import VueRouter from 'vue-router'
import MyEditor from '../components/MyEditor.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/newsAdd',
    name: 'MyEditor',
    component: MyEditor
  }
]

const router = new VueRouter({
  routes
})

export default router
