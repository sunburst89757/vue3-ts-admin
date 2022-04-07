import type { RouteRecordRaw } from "vue-router";
// meta下的role用来控制指定路由不对该role开放
// 把用户分为三层： super-admin admin common-user
// super-admin拥有所有路由的访问权限
// 其他用户如果meta下存在role则必须要求role有对应的用户，才有访问资格；如果没有meta或meta下没有role则是都有访问资格的
// 对于一级路由，如果一级路由不能访问就在一级路由的meta下配置role；如果一级路由下有子路由可以访问，一级路由可以不配，子路由的meta.role必须配置
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/salesManage",
    name: "salesManage",
    component: () => import("@/components/Layout.vue"),
    redirect: "/salesManage/customerManage",
    meta: {
      name: "销售管理"
    },
    children: [
      {
        // 子路由不能前面不能加/
        path: "customerManage",
        name: "customerManage",
        component: () => import("@/views/SalesManage/CustomerManage"),
        meta: {
          name: "顾客管理",
          role: ["admin", "common-user"]
        }
      },
      {
        path: "productManage",
        name: "productManage",
        component: () => import("@/views/SalesManage/ProductManage"),
        meta: {
          name: "产品管理",
          role: ["admin", "common-user"]
        }
      },
      {
        path: "contractManage",
        name: "contractManage",
        component: () => import("@/views/SalesManage/ContractManage.vue"),
        meta: {
          name: "合同管理",
          role: ["admin"]
        }
      },
      {
        path: "deliverManage",
        name: "deliverManage",
        component: () => import("@/views/SalesManage/TransportManage.vue"),
        meta: {
          name: "运输管理",
          role: ["admin"]
        }
      }
    ]
  },
  {
    path: "/system",
    name: "system",
    redirect: "/system/roleManage",
    component: () => import("@/components/Layout.vue"),
    meta: {
      name: "系统管理",
      role: ["admin"]
    },
    children: [
      {
        path: "roleManage",
        name: "roleManage",
        component: () => import("@/views/systemManage/roleManage.vue"),
        meta: {
          name: "角色管理"
          // role: []
        }
      },
      {
        path: "userManage",
        name: "userManage",
        component: () => import("@/views/systemManage/userManage.vue"),
        meta: {
          name: "用户管理"
          // role: []
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not-found",
    meta: {
      hidden: true,
      name: "404"
    }
  }
];

export default asyncRoutes;
