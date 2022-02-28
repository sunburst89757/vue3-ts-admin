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
          // 这里的path实际上使用的是命名路由
          path: "home"
        }
      ],
      tabActive: "home",
      menuActive: "首页"
    };
  },
  actions: {
    addTab(tab: tabType) {
      console.log(this.tabs);
      console.log("传递的tab", tab);
      this.tabs.push(tab);
      // this.tabs = [...new Set(this.tabs)];
      this.tabActive = tab.path;
    }
    // isTabIntabs(tab: tabType) {
    //   return this.tabs.some((item) => {
    //     return item.title == tab.title;
    //   });
    // }
  }
});
