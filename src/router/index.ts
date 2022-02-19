import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue")
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/Main/Main.vue")
  }
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
