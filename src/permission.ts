import router from "./router";
import asyncRoutes from "./router/asyncRoutes";
import { RouteRecordRaw } from "vue-router";
import { userStore } from "@/store";
import cache from "@/utils/cache";
function genetrateAccessibleRoute(role: string, asyncRoutes: RouteRecordRaw[]) {
  const accessibleRoute = asyncRoutes.filter((item) => {
    if ((item?.children as any).length > 0) {
      genetrateAccessibleRoute(role, item.children as RouteRecordRaw[]);
    } else {
      return (item.meta as any).role.include(role);
    }
  });
  return accessibleRoute;
}

// router.beforeEach((to, from, next) => {
//   console.log(2);

//   const token = cache.getCache("token");
//   const role = userStore.role[0];
//   console.log(role, "role是啥");

//   if (to.path !== "/login") {
//     if (!token) {
//       router.push("/login");
//     } else {
//       if (role) {
//         console.log("之心那个");

//         next();
//       } else {
//         userStore.getUserRole();
//         const accessibleRoute = genetrateAccessibleRoute(
//           userStore.role[0],
//           asyncRoutes
//         );
//         accessibleRoute.forEach((item) => {
//           router.addRoute(item);
//         });
//         console.log(accessibleRoute, "可访问的路由");
//       }
//     }
//   } else {
//     next();
//   }
// });
