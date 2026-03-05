import { redirect, type ActionFunctionArgs } from "react-router-dom";
import type { Entry } from "../../types/entry";
import { apiClient } from "../../api/client";

export async function entriesAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const userId = formData.get('userId');
  switch (intent) {
    case 'create': {
      const entry = await apiClient<Entry>(`/users/${userId}/entries`, { method: 'POST', });
      return redirect(`/entries/${entry.id}`);
    }

    case 'delete': {
      const entryId = formData.get('entryId');
      await apiClient<Entry>(`/users/${userId}/entries/${entryId}`, { method: 'DELETE', });
      return null;
    }

    default:
      return null;
  }
}
