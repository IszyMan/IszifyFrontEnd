import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/main.css";
import Popper from "vue3-popper";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Toast);
app.use(router);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Popper", Popper);
app.mount("#app");
