import type { RouteRecordRaw } from "vue-router";

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Dashboard/Dashboard.vue"),
    meta: {
      name: "首页"
    }
  },
  {
    path: "/salesManage",
    component: () => import("@/components/Layout.vue"),
    redirect: "salesManage/customerManage",
    meta: {
      name: "销售管理"
    },
    children: [
      {
        // 子路由不能前面不能加/
        path: "customerManage",
        name: "customerManage",
        component: () => import("@/views/SalesManage/CustomerManage.vue"),
        meta: {
          name: "顾客管理"
        }
      },
      {
        path: "productManage",
        name: "productManage",
        component: () => import("@/views/SalesManage/ProductManage.vue"),
        meta: {
          name: "产品管理"
        }
      },
      {
        path: "contractManage",
        name: "contractManage",
        component: () => import("@/views/SalesManage/ContractManage.vue"),
        meta: {
          name: "合同管理"
        }
      },
      {
        path: "deliverManage",
        name: "deliverManage",
        component: () => import("@/views/SalesManage/TransportManage.vue"),
        meta: {
          name: "运输管理"
        }
      }
    ]
  },
  {
    path: "/systeam",
    component: () => import("@/components/Layout.vue"),
    meta: {
      name: "系统管理"
    },
    children: [
      {
        path: "roleManage",
        name: "roleManage",
        component: () => import("@/views/systeamManage/roleManage.vue"),
        meta: {
          name: "角色管理"
        }
      },
      {
        path: "userManage",
        name: "userManage",
        component: () => import("@/views/systeamManage/userManage.vue"),
        meta: {
          name: "用户管理"
        }
      }
    ]
  }
];

export default asyncRoutes;
