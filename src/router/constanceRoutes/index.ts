import type { RouteRecordRaw } from "vue-router";
// 父组件是路由组件就匹配了其中一个，子组件也是路由组件，则必须匹配子路由才可以
// 主路由所有用户都可以访问的路由
export const constanceRoutes: RouteRecordRaw[] = [
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
        component: () => import("@/views/Dashboard/Dashboard.vue"),
        meta: {
          name: "首页"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: "/not-found",
    component: () => import("@/components/404.vue")
  }
];
