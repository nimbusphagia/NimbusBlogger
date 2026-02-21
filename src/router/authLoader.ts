import { redirect } from "react-router-dom";
import { apiClient } from "../api/client";
import type { Role, User } from "../types/user";

const ALLOWED_ROLES: Role[] = ["AUTHOR", "ADMIN"];

export async function authLoader(): Promise<User | Response> {
  try {
    const user = await apiClient<User>("/me");
    if (!ALLOWED_ROLES.includes(user.role)) {
      return redirect("/unauthorized");
    }
    return user;

  } catch (error) {
    console.log(error);
    return redirect("/auth")
  }
}

