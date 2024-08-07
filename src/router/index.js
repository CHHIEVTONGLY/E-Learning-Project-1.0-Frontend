import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CourseView from "@/views/CourseView.vue";
import successPay from "../components/successPay.vue";
import cancelPay from "../components/cancelPay.vue";
import ProfileView from "@/views/ProfileView.vue";
import CourseData from "@/components/courseData.vue";
import CourseShowing from "@/views/CourseShowing.vue";
import ABATesting from "@/views/ABATesting.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/aba-pay",
    name: "aba-pay",
    component: ABATesting,
  },
  {
    path: "/complete-order",
    name: "Success",
    component: successPay,
  },
  {
    path: "/cancel-order",
    name: "Cancel",
    component: cancelPay,
  },
  {
    path: "/course",
    name: "Course",
    component: CourseView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
      },
      {
        path: "all",
        name: "allcourse",
        component: CourseData,
      },
      {
        path: ":id",
        name: "courseShowing",
        component: CourseShowing,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = sessionStorage.getItem("e-token");

  if (requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
