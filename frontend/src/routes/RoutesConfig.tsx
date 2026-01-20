import { PATH } from "../const/Path"
import { Dashboard } from "../pages/Dashboard"
import { BlogsPageIndex } from "../pages/BlogsPageIndex"
import { Home } from "../pages/Home"
import { BlogDetails } from "../components/blog/BlogDetails"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { NotFound } from "../pages/NotFound"
import type { RouteItem } from "../types"

export const routesConfig: RouteItem[] = [
    { path: PATH.HOME, element: <Home />, protected: false },
    { path: PATH.DASHBOARD, element: <Dashboard />, protected: true },
    { path: PATH.MANAGE_BLOGS, element: <BlogsPageIndex />, protected: true },
    { path: PATH.BLOG_DETAILS, element: <BlogDetails />, protected: false },
    { path: PATH.POSTS, element: <Home />, protected: false },
    { path: PATH.LOGIN, element: <Login />, protected: false },
    { path: PATH.REGISTER, element: <Register />, protected: false },
    { path: "*", element: <NotFound />, protected: false },
]