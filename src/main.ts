import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import register from "./global";
import "normalize.css";
import "./assets/css/index.less";
import { refreshGenerateRoutes } from "./store/modules/user";
const store = createPinia();
store.use(piniaPluginPersistedstate);
const app = createApp(App);
// 注册相关配置
register(app);
app.use(store);
// 刷新时重新动态生成路由
refreshGenerateRoutes();
app.use(router);
app.mount("#app");
