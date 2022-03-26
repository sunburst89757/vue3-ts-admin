import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import register from "./global";
import "normalize.css";
import "./assets/css/index.less";
const app = createApp(App);
// 注册相关配置
register(app);
app.use(store);
app.use(router);
app.mount("#app");
