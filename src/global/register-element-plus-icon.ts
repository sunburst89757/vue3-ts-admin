// element-plus 的icon配置文件
import type { App } from "vue";
import {
  Brush,
  Baseball,
  Bell,
  Bottom,
  User,
  Lock
} from "@element-plus/icons-vue";
const components = [Brush, Baseball, Bell, Bottom, User, Lock];

export function registerIcon(app: App): void {
  components.forEach((component) => {
    app.component((component.name as string).toLowerCase(), component);
  });
  app.component("brush", Brush);
}
