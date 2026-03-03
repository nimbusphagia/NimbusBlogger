import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import type { Entry } from "../../types/entry";
import type { User } from "../../types/user";
import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function editorLoader({ params }: LoaderFunctionArgs) {

  const user = await authLoader() as User;
  const entryId = params.entryId;

  if (!entryId) throw new Error("Missing entryId");

  try {
    return await apiClient<Entry>(
      `/users/${user.id}/entries/${entryId}`
    );
  } catch (error) {

    if (error instanceof Response && error.status === 404) {
      throw redirect(`/entries`);
    }

    throw error;
  }
}
