import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import CameraPage from "@/views/CameraPage";

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/FriendsPage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/GroupsPage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  },

  {
    path: '/camera',
    component: CameraPage  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
