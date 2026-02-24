import type { Entry } from "../../types/entry";
import { apiClient } from "../../api/client";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import type { Block } from "../../types/block";
type Intent = "editTitle" | "createBlock";

type EntryInfo = {
  authorId: string,
  entryId: string,
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    throw new Response(`Missing or invalid ${key}`, { status: 400 });
  }
  return value;
}
async function getEntryInfo(
  request: Request,
  params: ActionFunctionArgs["params"]
) {
  const formData = await request.formData();

  const authorId = getString(formData, "authorId");

  const entryId = params.entryId;
  if (typeof entryId !== "string") {
    throw new Response("Missing entryId", { status: 400 });
  }

  return { formData, entryInfo: { authorId, entryId } };
}

async function editTitle(title: string, { authorId, entryId }: EntryInfo) {
  const entry = await apiClient<Entry>(
    `/users/${authorId}/entries/${entryId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
    }
  );
  return redirect(`/entries/${entry.id}`);
}
async function createBlock(blockType: string, { authorId, entryId }: EntryInfo) {
  const block = await apiClient<Block>(
    `/users/${authorId}/entries/${entryId}/blocks`,
    {
      method: "POST",
      body: JSON.stringify({ blockType }),
    }
  );
  return redirect(`/entries/${block.entryId}`);
}
export async function editorAction({ request, params }: ActionFunctionArgs) {
  try {
    const { formData, entryInfo } = await getEntryInfo(request, params);
    const intent = formData.get("intent") as Intent | null;

    switch (intent) {
      case "editTitle": {
        const title = getString(formData, "title");
        return await editTitle(title, entryInfo);
      }

      case "createBlock": {
        const blockType = getString(formData, "blockType");
        return await createBlock(blockType, entryInfo);
      }

      default:
        return redirect("/entries");
    }
  } catch (error) {
    if (error instanceof Response) throw error;
    return new Response("Server error", { status: 500 });
  }
}
