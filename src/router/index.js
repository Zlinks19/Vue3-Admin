import layout from "components/layout/index.vue";

/**
 * createWebHistory = history
 * createWebHashHistory = has
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "首页",
    component: layout,
    children: [
      {
        path: "/home",
        name: "Home",
        meta: { isHide: true, name: "首页" },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "日志管理",
    component: layout,
    children: [
      {
        path: "/systemLog",
        name: "SystemLog",
        meta: { isHide: true, name: "系统日志" },
        component: () => import("views/managementLog/systemLog/index.vue"),
      },
      {
        path: "/userLog",
        name: "UserLog",
        meta: { isHide: true, name: "用户日志" },
        component: () => import("views/managementLog/userLog/index.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "账号管理",
    component: layout,
    children: [
      {
        path: "/userManag",
        name: "UserManag",
        meta: { isHide: true, name: "系统日志" },
        component: () => import("views/managementAccount/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: { isHide: false, name: "Login" },
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    sessionStorage.removeItem("user");
  }

  if (!sessionStorage.getItem("user") && to.path != "/login") {
    next({ path: "/login" });
  } else {
    next();
    document.title = to.meta.name;
  }
});

export default router;
