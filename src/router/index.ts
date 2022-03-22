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
  },
  ...asyncRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes: constanceRoutes
});
function hasPermissonRoutes(route: RouteRecordRaw, role: string) {
  if (route?.meta?.role) {
    return route.meta.role.includes(role);
  } else {
    return true;
  }
}
function getPermissionRoutes(routes: RouteRecordRaw[], role: string) {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermissonRoutes(tmp, role)) {
      if (tmp?.children) {
        tmp.children = getPermissionRoutes(tmp.children, role);
      }
      res.push(tmp);
    }
  });
  return res;
}
function generateAccessibleRoute(role: string, routes: RouteRecordRaw[]) {
  let accessibleRoute: RouteRecordRaw[];
  if (role === "super-admin") {
    console.log("这个");
    accessibleRoute = routes;
  } else {
    console.log("不是这个");
    accessibleRoute = getPermissionRoutes(routes, role);
  }
  return accessibleRoute;
}

function getUserRole() {
  cache.setCache("role", ["super-admin"]);
}

router.beforeEach((to, from, next) => {
  console.log(2);

  const token = cache.getCache("token");
  const role = cache.getCache("role");
  console.log(role, "role是啥");

  if (to.path !== "/login") {
    if (!token) {
      router.push("/login");
    } else {
      //#region
      if (role) {
        console.log("之心那个");
      } else {
        // userStore.getUserRole();
        getUserRole();
        const accessibleRoute = generateAccessibleRoute(
          cache.getCache("role")[0],
          asyncRoutes
        );

        console.log(accessibleRoute, "可访问的路由");
        accessibleRoute.forEach((route) => {
          console.log(route, "是3个吗");
          router.addRoute(route);
          // if (route?.children) {
          //   const tmp = { ...route };
          //   delete tmp["children"];
          //   router.addRoute(tmp);
          //   route.children.forEach((item) => {
          //     router.addRoute(tmp.name as RouteRecordName, item);
          //   });
          // } else {
          //   router.addRoute(route);
          // }
        });
      }
      //#endregion
      next();
    }
  } else {
    next();
  }
});

export default router;
