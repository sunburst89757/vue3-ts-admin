import { defineStore } from "pinia";
import _ from "lodash";
interface tabType {
  title: string;
  path: string;
}
interface stateType {
  tabs: tabType[];
  tabActive: string;
  menuActive: string;
}
function isTabIntabs(tab: tabType, tabs: tabType[]) {
  return tabs.some((item) => {
    return item.title === tab.title;
  });
}
export const useTabs = defineStore({
  id: "tabsStore",
  state: (): stateType => {
    return {
      tabs: [
        {
          title: "首页",
          // 这里的path实际上使用的是命名路由
          path: "dashboard"
        }
      ],
      tabActive: "dashboard",
      menuActive: "dashboard"
    };
  },
  actions: {
    addTab(tab: tabType) {
      console.log(tab, "传递的tab");

      console.log(this.tabs);
      if (!isTabIntabs(tab, this.tabs)) {
        this.tabs.push(tab);
      }
      // this.tabs.push(tab);
      this.tabActive = tab.path;
    }
  }
  // 开启数据缓存
  // persist: true
});
