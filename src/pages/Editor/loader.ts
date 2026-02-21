import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import type { Entry } from "../../types/entry";
import type { User } from "../../types/user";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function editorLoader(
  { params }: LoaderFunctionArgs
): Promise<Entry> {

  const user = await authLoader() as User;

  const entryId = params.entryId;

  if (!entryId) {
    throw new Error("Missing entryId");
  }

  const entry = await apiClient<Entry>(
    `/users/${user.id}/entries/${entryId}`
  );

  return entry;
}
