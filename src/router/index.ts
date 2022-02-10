import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
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

export default router;
