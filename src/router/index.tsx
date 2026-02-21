import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/Root";
import { Login } from "../pages/Login";
import { loginAction } from "../pages/Login/action";
import { Dashboard } from "../pages/Dashboard";
import { authLoader } from "./authLoader";
import ErrorPage from "../pages/Error";
import { Editor } from "../pages/Editor";
import { dashboardLoader } from "../pages/Dashboard/loader";
import { editorLoader } from "../pages/Editor/loader";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: RootLayout,
    loader: authLoader,
    children: [
      {
        index: true,
        Component: Dashboard,
        loader: dashboardLoader,
      },
      {
        path: "/editor",
        Component: Editor,
        loader: editorLoader,
      },
    ],
  },
  {
    path: "/auth",
    Component: Login,
    action: loginAction,
  }
])
