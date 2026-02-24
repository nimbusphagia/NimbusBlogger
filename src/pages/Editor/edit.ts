import type { Entry } from "../../types/entry";
import type { User } from "../../types/user";
import { apiClient } from "../../api/client";
import { authLoader } from "../../router/authLoader";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

export async function editorAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }

  const entryId = params.entryId;
  if (!entryId) {
    throw new Error("Missing entry id");
  }

  const user = (await authLoader()) as User;

  const entry = await apiClient<Entry>(
    `/users/${user.id}/entries/${entryId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
    }
  );

  return redirect(`/entries/${entry.id}`);
}
