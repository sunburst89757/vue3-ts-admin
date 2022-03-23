import { createRouter, createWebHistory, stringifyQuery } from "vue-router";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";
import { userStore } from "@/store";
import asyncRoutes from "./asyncRoutes";
import cache from "@/utils/cache";
// 父组件是路由组件就匹配了其中一个，子组件也是路由组件，则必须匹配子路由才可以
// 主路由所有用户都可以访问的路由
const constanceRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/Layout.vue"),
    redirect: "/dashBoard",
    children: [
      {
        // 这里子路由匹配是唯一特殊的，spa的整体布局需要匹配layout作为父组件，子组件也是路由组件也得匹配，dashboard想
        // 作为一级路由必须做为/的子路由,子路由前面不能加/
        path: "dashBoard",
        name: "dashBoard",
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
