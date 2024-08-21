import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/SignUpView.vue"),
  },
  {
    path: "/reset-password/:accesstoken",
    name: "reset-password",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/auth/ResetPasswordView.vue"
      ),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/auth/ForgotPasswordView.vue"
      ),
  },
  {
    path: "/otp-verify",
    name: "otp-verify",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/OtpView.vue"),
  },
  {
    path: "/admin",
    name: "admins",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/admin/AdminView.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/DashboardView.vue"
          ),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: { noSidebar: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
