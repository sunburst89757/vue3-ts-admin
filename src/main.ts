import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import register from "./global";
const app = createApp(App);
register(app);
app.use(store);
app.use(router);
app.mount("#app");
