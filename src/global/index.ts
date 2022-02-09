// 全局配置文件
import type { App } from "vue";
import { registerIcon } from "./register-element-plus-icon";
export default function register(app: App): void {
  registerIcon(app);
}
