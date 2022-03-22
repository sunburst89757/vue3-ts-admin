import { defineStore } from "pinia";
import cache from "@/utils/cache";
import { login, getUserRole } from "@/api/login/user";
import type { userType, ILoginResult } from "@/api/login/types";
import router from "@/router";
interface stateType {
  nickName: string;
  userId: number;
  token: string;
  role: string[];
}
export const useUserStore = defineStore("mian", {
  state: (): stateType => {
    return {
      nickName: "",
      userId: 0,
      token: "",
      role: []
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
        console.log(1);
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
      console.log("查看code", code);

      this.role.push("super-admin");
      cache.setCache("role", ["super-admin"]);
    }
  }
  // persist: true
});
