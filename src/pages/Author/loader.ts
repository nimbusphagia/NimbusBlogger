import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import type { User } from "../../types/user";

export async function authorLoader() {
  const user = await authLoader() as User;
  try {
    return await apiClient<User>(
      `/users/${user.id}`
    );
  } catch (error) {
    throw error;
  }
}
