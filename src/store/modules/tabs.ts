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
export const useTabs = defineStore({
  id: "tabsStore",
  state: (): stateType => {
    return {
      tabs: [
        {
          title: "首页",
          path: "/home"
        }
      ],
      tabActive: "/home",
      menuActive: "首页"
    };
  },
  actions: {
    addTab(tab: tabType) {
      if (!this.isTabIntabs(tab)) {
        console.log(this.isTabIntabs(tab), "新增");
        this.tabs.push(tab);
      }
      this.tabActive = tab.path;
    },
    isTabIntabs(tab: tabType) {
      console.log(tab, this.tabs);
      return this.tabs.some((item) => {
        return item.path == tab.path;
      });
    }
  }
});
