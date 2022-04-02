import { defineStore } from "pinia";
import _ from "lodash";
import router from "@/router";
import { RouteLocationNormalizedLoaded, RouteRecordName } from "vue-router";
interface tabType {
  title: string;
  path: any;
}
interface stateType {
  tabs: tabType[];
  tabActive: string;
  menuActive: string;
}
export const useTabStore = defineStore({
  id: "tabs",
  state: (): stateType => {
    return {
      tabs: [
        /*  {
          title: "",
          // 这里的path实际上使用的是命名路由
          path: ""
        } */
      ],
      tabActive: "",
      menuActive: ""
    };
  },
  actions: {
    isTabInTabs(routeName: RouteRecordName) {
      return this.tabs.some((tab) => {
        return tab.path === routeName;
      });
    },
    addTab(tab: tabType) {
      console.log(tab, "传递的tab");
      console.log(this.tabs);
      this.tabs.push(tab);
      this.tabActive = tab.path;
    },
    removeTab(path: string) {
      if (this.tabs.length > 1) {
        const val = this.tabs.find((item) => {
          return item.path === path;
        });
        _.pull(this.tabs, val);
        this.tabActive = this.tabs[this.tabs.length - 1].path;
        this.menuActive = this.tabs[this.tabs.length - 1].path;
        router.push({
          name: this.tabActive
        });
      } else {
        this.tabs.pop();
        this.tabs.push({
          path: "dashboard",
          title: "首页"
        });
        this.tabActive = "dashboard";
        this.menuActive = "dashboard";
        router.push({
          name: "dashboard"
        });
      }
    },
    jumpOtherTab(val: any) {
      this.menuActive = val.props.name;
      console.log(val.props.name, "route的name");
      router.push({ name: val.props.name });
    },
    handleTab(route: RouteLocationNormalizedLoaded) {
      if (!this.isTabInTabs(route.name as RouteRecordName)) {
        const tab = {
          title: route.meta.name as string,
          path: route.name as RouteRecordName
        };
        this.addTab(tab);
      } else {
        // 已有的tab，重置tab状态
        console.log(route.name, "名字");

        this.tabActive = String(route.name);
        this.menuActive = this.tabActive;
        return;
      }
    }
  },
  // 开启数据缓存
  persist: true
});
