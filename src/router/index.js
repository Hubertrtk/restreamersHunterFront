import { createRouter, createWebHistory } from 'vue-router'
import AllGroups from '../components/AllGroups.vue'

const routes = [
  {
    path: '/allGroups/:groupName',   // 👈 dynamiczny parametr w URL
    name: 'GroupView',
    component: AllGroups,
    props: true                     // 👈 przekazuje `groupName` jako props
  },
  {
    path: '/',
    redirect: '/allGroups/found'   // 👈 możesz ustawić domyślną grupę
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
