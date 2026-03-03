import { type ActionFunctionArgs } from "react-router-dom";
import type { BlockType } from "../../types/block";
import { getString } from "../../lib";
import { editTitle, createBlock, editBlock, deleteBlock, getEntryInfo, deleteEntry } from './actions'

type Intent = "editTitle" | "deleteEntry" | "createBlock" | "editBlock" | "deleteBlock";

export async function editorAction({ request, params }: ActionFunctionArgs) {
  try {
    const { formData, entryInfo } = await getEntryInfo(request, params);
    const intent = formData.get("intent") as Intent | null;

    if (!intent) {
      return { type: "error" as const, message: "Missing intent" };
    }

    switch (intent) {
      case "editTitle": {
        const title = getString(formData, "title");
        return await editTitle(title, entryInfo);
      }

      case "createBlock": {
        const blockType = getString(formData, "blockType") as BlockType;
        const index = Number(getString(formData, "index"));
        return await createBlock({ blockType, index }, entryInfo);
      }

      case "editBlock": {
        const blockId = getString(formData, "blockId");

        const text = formData.get("text");
        const mediaSrc = formData.get("mediaSrc");

        return await editBlock(
          {
            ...(typeof text === "string" && { text }),
            ...(typeof mediaSrc === "string" && { mediaSrc }),
          },
          blockId,
          entryInfo
        );
      }

      case "deleteBlock": {
        const blockId = getString(formData, "blockId");
        return await deleteBlock(blockId, entryInfo);
      }
      case "deleteEntry": {
        return await deleteEntry(entryInfo);
      }
      default:
        return {
          type: 'error',
          message: 'Invalid intent'
        };
    }
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    return {
      type: "error" as const,
      message: "Server error",
    };
  }
}
