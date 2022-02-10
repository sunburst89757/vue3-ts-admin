import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import register from "./global";
const app = createApp(App);
// 注册相关配置
register(app);
app.use(store);
app.use(router);
app.mount("#app");
console.log(process.env.VUE_APP_MY_NAME);
console.log(process.env.VUE_APP_BASE_URL);
