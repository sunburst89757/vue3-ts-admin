import { createRouter, createWebHistory } from "vue-router";
import { constanceRoutes } from "./constanceRoutes";
import { useUserStore } from "@/store/modules/user";
import cache from "@/utils/cache";
import asyncRoutes from "./asyncRoutes";
function generateAccessRoutes(role: string, routes: any[]): void {
  if (role === "super-admin") {
    return;
  } else {
    const delIndexs: number[] = [];
    routes.forEach((route) => {
      if (!route.meta.role || route.meta?.role.includes(role)) {
        if (route?.children?.length > 0) {
          generateAccessRoutes(role, route.children);
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
const router = createRouter({
  history: createWebHistory(),
  routes: constanceRoutes
});
router.beforeEach(async (to, from, next) => {
  const token = cache.getCache("token");
  if (to.path !== "/login") {
    if (!token) {
      router.push("/login");
    } else {
      const userStore = useUserStore();
      if (!userStore.role) {
        console.log("执行");
        await userStore.getUserRole();
        generateAccessRoutes(userStore.role, asyncRoutes);
        // 注册动态路由
        asyncRoutes.forEach((element) => {
          router.addRoute(element);
        });
        userStore.generateUserMenus();
        console.log(to, "to对象");

        // 不使用 next() 是因为，在执行完 router.addRoute 后，
        // 原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
