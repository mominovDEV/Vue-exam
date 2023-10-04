import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin";
import superadmin from "./superadmin";
import auth from "./auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [admin, superadmin, auth],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const name = to.name === "auth";
  if (!token && !name) {
    return next({ name: "auth" });
  } else {
    if (token && name) {
      return next({ name: "superadmin" });
    } else {
      next();
    }
  }
});

export default router;
