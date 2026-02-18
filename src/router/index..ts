import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { Login } from "../pages/Login";
import { loginAction } from "../pages/Login/action";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [],
  },
  {
    path: "/auth",
    Component: Login,
    action: loginAction,
  }
])
