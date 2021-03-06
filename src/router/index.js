import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import CameraPage from "@/views/CameraPage";
const routes = [
  {
    path: '/',
    component: () => import('@/views/IntroPage'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/app/',
    component: TabsPage,
  meta: {
  requiresAuth: true
},
    children: [
      {
        path: '',
        redirect: '/app/friends',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'friends',
        component: () => import('@/views/FriendsPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'groups',
        component: () => import('@/views/GroupsPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'user/:username',
        component: () => import('@/views/UserProfile.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'edit-account',
        component: () => import('@/views/forms/EditProfileForm.vue'),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },

  {
    path: '/camera',
    component: CameraPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/forms/SignInForm')
  },
  {
    path: '/register',
    component: () => import('@/views/forms/RegisterForm')
  },
  {
    path: '/register-username',
    component: () => import('@/views/forms/RegisterUsername'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/friend-request',
    component: () => import('@/views/FriendRequestPage'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next)=>{
  let user = localStorage.getItem('user')
  let isUserLogged = !user || user === 'undefined' || user === '' ? null : JSON.parse(user) ;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(from, to)
  if(requiresAuth && !isUserLogged && to.fullPath !== '/register-username'){
    next('/')
  }else if (!requiresAuth && isUserLogged) {
    console.log('a')
    next('/app/friends')
  } else {
    next()
  }
})
export default router
