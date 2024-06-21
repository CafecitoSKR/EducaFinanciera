import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config";
import Toolbar from "primevue/toolbar";
import {RouterLink} from "vue-router";
import router from "@/router.js";
import Card from "primevue/card";
import Button from "primevue/button";
import createStore from "@/store/index.js";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(createStore);

app.component('pv-toolbar',Toolbar)
app.component('pv-router-link',RouterLink)
app.component('pv-card',Card)
app.component('pv-button',Button)

app.mount('#app')
