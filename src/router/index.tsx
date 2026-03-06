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
import { entriesLoader } from "../pages/Entries/loader";
import { Entries } from "../pages/Entries";
import { editorAction } from "../pages/Editor/editorAction";
import { entriesAction } from "../pages/Entries/action";
import { Author } from "../pages/Author";
import { authorLoader } from "../pages/Author/loader";
import { authorAction } from "../pages/Author/action";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: RootLayout,
    loader: authLoader,
    id: 'root',
    children: [
      {
        index: true,
        Component: Dashboard,
        loader: dashboardLoader,
      },
      {
        path: 'entries',
        children: [
          {
            index: true,
            Component: Entries,
            loader: entriesLoader,
            action: entriesAction,
          },
          {
            path: ":entryId",
            Component: Editor,
            loader: editorLoader,
            action: editorAction,
          },
        ]
      },
      {
        path: 'author',
        Component: Author,
        loader: authorLoader,
        action: authorAction,
      }
    ],
  },
  {
    path: "/auth",
    Component: Login,
    action: loginAction,
  }
])
