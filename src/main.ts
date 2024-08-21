import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/main.css";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Toast);
app.use(router);
app.mount("#app");
