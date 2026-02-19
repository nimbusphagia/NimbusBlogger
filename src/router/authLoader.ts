import { redirect } from "react-router-dom";
import { apiClient } from "../api/client";

type Role = "AUTHOR" | "ADMIN" | "VIEWER";

type User = {
  id: string;
  email: string;
  role: Role;
};

const ALLOWED_ROLES: Role[] = ["AUTHOR", "ADMIN"];

export async function authLoader() {
  const user = await apiClient<User>("/me");

  if (!ALLOWED_ROLES.includes(user.role)) {
    return redirect("/unauthorized");
  }

  return user;
}

