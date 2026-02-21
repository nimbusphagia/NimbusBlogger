import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import type { Entry } from "../../types/entry";
import type { User } from "../../types/user";

export async function entriesLoader(): Promise<Entry[]> {

  const user = await authLoader() as User;

  const entries = await apiClient<Entry[]>(
    `/users/${user.id}/entries/`
  );

  return entries;
}
