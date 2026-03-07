import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import type { User } from "../../types/user";
import type { Entry } from "../../types/entry";
export async function dashboardLoader() {
  const user = await authLoader() as User;
  try {
    const [entries, mostLiked, mostRecent] = await Promise.all([
      apiClient<Entry[]>(`/users/${user.id}/entries`),
      apiClient<Entry[]>(`/users/${user.id}/entries?filter=mostLiked`),
      apiClient<Entry[]>(`/users/${user.id}/entries?filter=mostRecent`),
    ]);

    const published = entries.filter((e) => e.publishedAt).length;
    const drafts = entries.length - published;

    return { published, drafts, mostLiked, mostRecent };
  } catch (error) {
    throw error;
  }
}
