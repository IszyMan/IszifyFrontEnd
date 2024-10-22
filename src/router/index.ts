import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { session } from "@/utils";
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
        meta: { requiresAuth: true },
      },
      {
        path: "qrcode",
        name: "Qrcode",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/qrs/QrcodeView.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "qrcode/create-new",
        name: "newQrcode",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/qrs/NewQrcode.vue"
          ),
        meta: { requiresAuth: true },
      },

      {
        path: "qrcode/edit/:id",
        name: "EditQrCode",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/qrs/EditQrCode.vue"
          ),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "qrcode/view/:id",
        name: "staticQr",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/qrs/ViewDetails.vue"
          ),
        props: true,
        meta: { requiresAuth: true },
      },

      {
        path: "bio",
        name: "BioLinks",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/bio/BioLinksView.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "bio/new",
        name: "NewBioLink",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/bio/NewBioLink.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "links",
        name: "UrlLinks",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/urls/UrlLinksView.vue"
          ),
      },
      {
        path: "links/new",
        name: "NewUrlLink",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/urls/NewUrlLinkView.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "settings",
        name: "Settings",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/admin/settings/SettingsView.vue"
          ),
        meta: { requiresAuth: true },
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

router.beforeEach(async (to, from, next) => {
  const loggedIn = session.get("sessionData");
  if (to.meta.requiresAuth === true && !loggedIn) {
    next("/login");
    // alert("You are not authorized");
  } else {
    next();
  }
});
export default router;
