import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/Root";
import { Login } from "../pages/Login";
import { loginAction } from "../pages/Login/action";
import { Dashboard } from "../pages/Dashboard";
import { authLoader } from "./authLoader";
import ErrorPage from "../pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
        loader: authLoader,

      }
    ],
  },
  {
    path: "/auth",
    Component: Login,
    action: loginAction,
  }
])
