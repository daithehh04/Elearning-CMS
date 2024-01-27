import Category from "../pages/category/Category";
import CourseDetail from "../pages/courseDetail/CourseDetail";
import Courses from "../pages/courses/Courses";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

// Public routers
export const publicRoutes =
  [
    { path: "/dang-nhap", component: Login }
  ];

// Private routes
export const privateRoutes = [
  { path: "/", component: Home },
  {
    path: "/category",
    component: Category,
  },
  { path: "/course", component: Courses },
  { path: "/course/chi-tiet-khoa-hoc/:slug", component: CourseDetail },
];