import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import asyncRoutes from "./asyncRoutes";
import cache from "@/utils/cache";
// 父组件是路由组件就匹配了其中一个，子组件也是路由组件，则必须匹配子路由才可以
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/Layout.vue"),
    redirect: "/home",
    children: [
      {
        // 这里子路由匹配是唯一特殊的，spa的整体布局需要匹配layout作为父组件，子组件也是路由组件也得匹配，dashboard想
        // 作为一级路由必须做为/的子路由,子路由前面不能加/
        path: "home",
        component: () => import("@/views/Dashboard/Dashboard.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("../views/Login/Login.vue")
  },
  ...asyncRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = cache.getCache("token");
  if (to.path !== "/login") {
    if (!token) {
      router.push("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

export { asyncRoutes };
