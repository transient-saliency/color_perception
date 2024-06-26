import { createApp } from "vue";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
