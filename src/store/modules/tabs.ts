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
  cacheComponents: string[];
}
function deleteArrElement<T>(arr: T[], element: T) {
  const index = arr.findIndex((item) => item === element);
  arr.splice(index, 1);
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
      menuActive: "",
      cacheComponents: []
    };
  },
  actions: {
    isTabInTabs(routeName: RouteRecordName) {
      // 退出登录时也监听了route导致把登录放进了tab
      if (routeName === "login") {
        return false;
      }
      return this.tabs.some((tab) => {
        return tab.path === routeName;
      });
    },
    addTab(tab: tabType) {
      console.log(tab, "传递的tab");
      console.log(this.tabs);
      this.tabs.push(tab);
      this.tabActive = tab.path;
      this.menuActive = tab.path;
      this.cacheComponents.push(tab.path);
    },
    removeTab(path: string) {
      if (this.tabs.length > 1) {
        const val = this.tabs.find((item) => {
          return item.path === path;
        });
        // _.pull(this.tabs, val);
        deleteArrElement(this.tabs, val);
        deleteArrElement(this.cacheComponents, path);
        this.tabActive = this.tabs[this.tabs.length - 1].path;
        this.menuActive = this.tabs[this.tabs.length - 1].path;
        router.push({
          name: this.tabActive
        });
      } else {
        this.tabs.pop();
        this.cacheComponents.pop();
        this.tabs.push({
          path: "dashboard",
          title: "首页"
        });
        this.tabActive = "dashboard";
        this.menuActive = "dashboard";
        this.cacheComponents.push("dashboard");
        router.push({
          name: "dashboard"
        });
      }
    },
    jumpOtherTab(val: any) {
      this.menuActive = val.props.name;
      router.push({ name: val.props.name });
    },
    handleTab(route: RouteLocationNormalizedLoaded) {
      // 退出登录会导致roue变化监听route会来修改tab
      if (route.name === "login") {
        return;
      }
      if (!this.isTabInTabs(route.name as RouteRecordName)) {
        const tab = {
          title: route.meta.name as string,
          path: route.name as RouteRecordName
        };
        this.addTab(tab);
      } else {
        // 已有的tab，重置tab状态
        // console.log(route.name, "名字");

        this.tabActive = String(route.name);
        this.menuActive = this.tabActive;
        return;
      }
    },
    // 登录初始化状态：因为在layout监听路由变化来操作tab因此首页就不能自动加载
    initState() {
      this.tabs.push({ title: "首页", path: "dashboard" });
      this.$patch({
        tabActive: "dashboard",
        menuActive: "dashboard"
      });
      // this.tabActive = "dashboard";
      // this.menuActive = "dashboard";
      this.cacheComponents.push("dashboard");
    }
  },
  // 开启数据缓存
  persist: true
});
