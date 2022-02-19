import type { RouteRecordRaw } from "vue-router";
const salesManageRouter: RouteRecordRaw[] = [
  {
    path: "/salesManage",
    component: () => import("@/components/Layout.vue"),
    redirect: "salesManage/customerManage",
    children: [
      {
        // 子路由不能前面不能加/
        path: "customerManage",
        component: () => import("@/views/SalesManage/CustomerManage.vue")
      }
    ]
  }
];

export { salesManageRouter };
