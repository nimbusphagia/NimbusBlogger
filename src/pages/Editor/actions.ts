import { apiClient } from "../../api/client";
import type { ActionFunctionArgs } from "react-router-dom";
import type { Entry } from "../../types/entry";
import type { Block, BlockType } from "../../types/block";
import { getString } from "../../lib";

type EntryInfo = {
  authorId: string,
  entryId: string,
}
type BlockInfo = {
  blockType: BlockType,
  index: number,
}
export type EditorActionResult =
  | { type: "createBlock"; blockId: string }
  | { type: "editBlock"; blockId: string }
  | { type: "deleteBlock"; blockId: string }
  | { type: "editTitle" }
  | { type: "error"; message: string };

export async function getEntryInfo(
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

export async function editTitle(title: string,
  { authorId, entryId }: EntryInfo
): Promise<EditorActionResult> {
  await apiClient<Entry>(
    `/users/${authorId}/entries/${entryId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
    }
  );
  return { type: 'editTitle' };
}
export async function createBlock(
  { blockType, index }: BlockInfo,
  { authorId, entryId }: EntryInfo
): Promise<EditorActionResult> {
  const newBlock = await apiClient<Block>(
    `/users/${authorId}/entries/${entryId}/blocks`,
    {
      method: "POST",
      body: JSON.stringify({ blockType, index }),
    }
  );
  return { type: 'createBlock', blockId: newBlock.id };
}
export async function deleteBlock(blockId: string,
  { authorId, entryId }: EntryInfo
): Promise<EditorActionResult> {
  await apiClient(
    `/users/${authorId}/entries/${entryId}/blocks/${blockId}`,
    {
      method: "DELETE",
    }
  );

  return { type: 'deleteBlock', blockId };

}
export async function editBlock(
  data: { text?: string; mediaSrc?: string },
  blockId: string,
  { authorId, entryId }: EntryInfo
): Promise<EditorActionResult> {
  await apiClient(
    `/users/${authorId}/entries/${entryId}/blocks/${blockId} `,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );

  return { type: 'editBlock', blockId };
}
