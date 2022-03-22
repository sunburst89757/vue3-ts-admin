import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
import register from "./global";
import "normalize.css";
import "./assets/css/index.less";
const store = createPinia();
store.use(piniaPluginPersist);
const app = createApp(App);
// 注册相关配置
register(app);
app.use(store);
app.use(router);
app.mount("#app");
