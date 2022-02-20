import { defineStore } from "pinia";
import cache from "@/utils/cache";
import { login, getUserMenus } from "@/api/login/user";
import type { userType, ILoginResult } from "@/api/login/types";
import router from "@/router";
interface stateType {
  nickName: string;
  userId: number;
  token: string;
  menus: any;
}
export const useUserStore = defineStore("mian", {
  state: (): stateType => {
    return {
      nickName: "",
      userId: 0,
      token: "",
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
        // 获取菜单
        this.getMenus();
        // 设置缓存
        this.loginCache(data);
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
    async getMenus() {
      const { data } = await getUserMenus();
      this.menus = data;
      cache.setCache("menus", data);
      console.log("查看菜单数据", data);
    }
  }
});
