import { App } from "vue";
import { utc2time, formatTimeStamp } from "@/utils/data-format";
export function registerProperties(app: App) {
  app.config.globalProperties.$filter = {
    formatTimeFromUtc(val: string) {
      return utc2time(val);
    },
    formatTimeFromTimeStamp(val: number) {
      return formatTimeStamp(val);
    }
  };
}
