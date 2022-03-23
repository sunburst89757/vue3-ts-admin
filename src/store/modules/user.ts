import { defineStore } from "pinia";
import cache from "@/utils/cache";
import { login, getUserRole } from "@/api/login/user";
import type { userType, ILoginResult } from "@/api/login/types";
import router from "@/router";
import asyncRoutes from "@/router/asyncRoutes";
interface stateType {
  nickName: string;
  userId: number;
  token: string;
  role: string[];
  menus: any[];
}
function map2Menus(role: string, routes: any[]): void {
  if (role === "super-admin") {
    return;
  } else {
    const delIndexs: number[] = [];
    routes.forEach((route) => {
      if (!route.meta.role || route.meta?.role.includes(role)) {
        if (route?.children?.length > 0) {
          map2Menus(role, route.children);
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
      role: [],
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
        // 根据用户角色生成用户菜单
        this.generateUserMenus(this.role[0]);
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
      this.role.push("super-admin");
      console.log(this.role, "@@@@@@@@@@@@@@");
      cache.setCache("role", ["super-admin"]);
    },
    // 生成用户菜单并动态注册路由
    generateUserMenus(role: string): void {
      console.log("用户的角色", role);
      // 这里的menus和asyncRoutes是完全等价的，因为二者是引用数据类型
      const menus: any[] = asyncRoutes;
      // 生成菜单
      map2Menus("common-user", menus);
      // 动态注册路由
      menus.forEach((element) => {
        router.addRoute(element);
      });
      this.menus = menus;
      console.log(menus, "改造后的菜单");
    }
  }
  // persist: true
});
