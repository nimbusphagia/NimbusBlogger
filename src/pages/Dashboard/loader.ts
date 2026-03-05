import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import type { User } from "../../types/user";
import type { Entry } from "../../types/entry";

export async function dashboardLoader() {

  const user = await authLoader() as User;

  try {
    const author = await apiClient<User>(`/users/${user.id}`);
    const entries = await apiClient<Entry[]>(
      `/users/${user.id}/entries`
    );
    const publishedEntries = entries.filter((e) => e.publishedAt);
    const published = publishedEntries.length;
    const drafts = entries.length - published;
    return { author, published, drafts };
  } catch (error) {
    throw error;
  }

}
