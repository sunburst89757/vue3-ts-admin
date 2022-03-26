import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";
import asyncRoutes from "./asyncRoutes";
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
// 动态注册路由
function generateUserRoutes(role: string): void {
  console.log("用户的角色", role);
  // 映射生成可访问的路由表
  roleMap2Routes("common-user", asyncRoutes);
  // 动态注册路由
  asyncRoutes.forEach((element) => {
    router.addRoute(element);
  });
  console.log(asyncRoutes, "异步路由");
}

// 父组件是路由组件就匹配了其中一个，子组件也是路由组件，则必须匹配子路由才可以
// 主路由所有用户都可以访问的路由
const constanceRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/Layout.vue"),
    redirect: "/dashboard",
    children: [
      {
        // 这里子路由匹配是唯一特殊的，spa的整体布局需要匹配layout作为父组件，子组件也是路由组件也得匹配，dashboard想
        // 作为一级路由必须做为/的子路由,子路由前面不能加/
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue")
  },
  {
    path: "/not-found",
    component: () => import("@/components/404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constanceRoutes
});
router.beforeEach((to, from, next) => {
  // const user = userStore.role;
  const token = cache.getCache("token");
  if (to.path !== "/login") {
    if (!token) {
      router.push("/login");
    } else {
      console.log(1);
      generateUserRoutes(cache.getCache("role"));
      next();
    }
  } else {
    console.log(1);
    generateUserRoutes(cache.getCache("role"));
    next();
  }
});
export default router;
