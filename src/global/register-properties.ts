import { App } from "vue";
import { utc2time } from "@/utils/data-format";
export function registerProperties(app: App) {
  app.config.globalProperties.$filter = utc2time;
}
