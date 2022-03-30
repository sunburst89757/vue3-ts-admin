// element-plus 的icon配置文件
import type { App } from "vue";
import {
  User,
  Lock,
  Location,
  Menu,
  Fold,
  Search,
  Refresh
} from "@element-plus/icons-vue";
const components = [User, Lock, Location, Menu, Fold, Search, Refresh];

export function registerIcon(app: App): void {
  components.forEach((component) => {
    app.component((component.name as string).toLowerCase(), component);
  });
}
