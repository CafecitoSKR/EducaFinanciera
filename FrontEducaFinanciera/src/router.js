import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/Home.component.vue';
import RegisterComponent from '@/components/register.component.vue';
import LoginComponent from '@/components/login.component.vue';
import ProfileComponent from '@/components/profile.component.vue';
import PostsComponent from '@/components/PostsComponent.vue';
import { isAuthenticated } from '@/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterComponent,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/profile');
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/profile');
      } else {
        next();
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileComponent,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: PostsComponent,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    }
  }
  // Otras rutas...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;