import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ForgotView from '@/views/ForgotView.vue'
import LearnersView from '@/views/LearnersView.vue'
import SignupView from '@/views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'
import UsersComp from '@/components/UsersComp.vue'
import HomeView2 from '@/views/HomeView2.vue'
import CoursesView from '@/views/CoursesView.vue'
import PriceListView from '@/views/PriceListView.vue'
import UsersProfileView from '@/views/UsersProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotView
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotView
  },
  {
    path: '/learners',
    name: 'learners',
    component: LearnersView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersComp
  },
  {
    path: '/homeTwo',
    name: 'homeTwo',
    component: HomeView2
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  },
  {
    path: '/pricelist',
    name: 'pricelist',
    component: PriceListView
  },
  {
    path: '/profile',
    name: 'profile',
    component: UsersProfileView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.meta.role;

  if (requiresAuth && !token) {
    next('/login');
  } else if (requiresAuth && token) {
    // Decode token to check role
    const decoded = jwtDecode(token);
    if (requiredRole && decoded.role !== requiredRole) {
      next('/unauthorized');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
