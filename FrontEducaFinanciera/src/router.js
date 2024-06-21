import { createMemoryHistory, createRouter } from 'vue-router'
import RegisterComponent from "@/components/register.component.vue";
import LoginComponent from "@/components/login.component.vue";
import store from './store';
import ForoComponent from "@/components/foro.component.vue";

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/register', component: RegisterComponent},
    { path: '/login', component: LoginComponent },
    { path: '/foro', component: ForoComponent, meta: { requiresAuth: true }}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
    if (rutaProtegida && store.state.token === null) {
        next('/');
    } else {
        next();
    }
})

export default router