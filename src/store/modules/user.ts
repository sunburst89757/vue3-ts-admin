import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";
import { login, getUserRole } from "@/api/login/user";
import type { userType, ILoginResult } from "@/api/login/types";
import router from "@/router";
import asyncRoutes from "@/router/asyncRoutes";

interface stateType {
  nickName: string;
  userId: number;
  token: string;
  role: string;
  menus: any[];
}
// 根据角色生成路由表
function roleMap2Routes(role: string, routes: any[]): void {
  if (role === "super-admin") {
    return;
  } else {
    const delIndexs: number[] = [];
    routes.forEach((route) => {
      if (!route.meta.role || route.meta?.role.includes(role)) {
        if (route?.children?.length > 0) {
          roleMap2Routes(role, route.children);
        } else {
          return;
        }
      } else {
        const index = routes.findIndex((item) => item === route);
        delIndexs.push(index);
      }
    });
    delIndexs.forEach((val, index) => {
      // 只有第一个删除的元素位置是正确的，后面由于数组长度减少，因此对应的序号也要减一才可以
      index === 0 ? routes.splice(val, 1) : routes.splice(val - 1, 1);
    });
  }
}
export const useUserStore = defineStore("mian", {
  state: (): stateType => {
    return {
      nickName: "",
      userId: 0,
      token: "",
      role: "",
      menus: []
    };
  },
  getters: {
    // nameEdit: (state) => {
    //   return state.name.replace("tyz", "cy");
    // }
  },
  actions: {
    async toLogin(loginForm: userType) {
      // 真正的返回的类型确实是IDataType这个类型，这里拿的不是，是因为在axios经过一次响应拦截了
      const { success, data } = await login(loginForm);
      if (success) {
        // 修改状态
        this.$patch({
          nickName: data.nickName,
          token: data.token,
          userId: data.userId
        });
        // 设置缓存
        this.loginCache(data);
        // 获取用户角色
        await this.getUserRole();
        // 根据用户角色注册动态路由
        this.generateUserRoutes();
        // 生成菜单
        this.generateUserMenus();
        router.push("/");
      } else {
        console.log(111);
      }
    },
    loginCache(data: ILoginResult) {
      cache.setCache("token", data.token);
      cache.setCache("userId", data.userId);
      cache.setCache("nickName", data.nickName);
    },
    // 获取用户角色
    async getUserRole() {
      // 这个接口乱写的，实际的时候要改
      const { code } = await getUserRole({
        pageNum: 1,
        pageSize: 5
      });
      this.role = "super-admin";
      console.log(this.role, "@@@@@@@@@@@@@@");
      cache.setCache("role", "super-admin");
    },
    // 动态注册路由
    generateUserRoutes(): void {
      console.log("用户的角色", cache.getCache("role"));
      console.log(asyncRoutes, "1异步路由");

      // 映射生成可访问的路由表
      roleMap2Routes("common-user", asyncRoutes);
      // 动态注册路由
      asyncRoutes.forEach((element) => {
        router.addRoute(element);
      });
      console.log(asyncRoutes, "改造的异步路由");
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
      // menus.pop();
      this.menus = menus;
      cache.setCache("menus", menus);
    }
  },
  persist: true
});

export function refreshGenerateRoutes(): void {
  useUserStore().generateUserRoutes();
}
