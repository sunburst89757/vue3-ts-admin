import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";
import { login, getUserRole } from "@/api/login/user";
import type { userType, ILoginResult } from "@/api/login/types";
import asyncRoutes from "@/router/asyncRoutes";

interface stateType {
  nickName: string;
  userId: number;
  role: string;
  menus: any[];
}
export const useUserStore = defineStore("user", {
  state: (): stateType => {
    return {
      nickName: "",
      userId: 0,
      role: "",
      menus: []
    };
  },
  actions: {
    async toLogin(loginForm: userType) {
      // 真正的返回的类型确实是IDataType这个类型，这里拿的不是，是因为在axios经过一次响应拦截了
      const { success, data } = await login(loginForm);
      if (success) {
        // 修改状态
        this.$patch({
          nickName: data.nickName,
          userId: data.userId
        });
        cache.setCache("token", data.token);
        return true;
        // router.push("/");
      }
      return false;
    },
    // 获取用户角色
    async getUserRole() {
      // 这个接口乱写的，实际的时候要改
      const { code } = await getUserRole({
        pageNum: 1,
        pageSize: 5
      });
      this.role = "common-user";
      console.log(this.role, "@@@@@@@@@@@@@@");
    },
    // 生成菜单
    generateUserMenus() {
      const route: RouteRecordRaw = {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/",
        meta: {
          name: "首页"
        }
      };
      const menus: any[] = JSON.parse(JSON.stringify(asyncRoutes));
      menus.unshift(route);
      menus.pop();
      this.menus = menus;
    }
  },
  // 这里没有把menus和role持久化，这是因为role和menus在刷新的时候动态生成路由时会重新生成一次
  persist: {
    key: "user",
    storage: window.sessionStorage,
    paths: ["nickName", "userId"]
  }
});
