
export type BlockType = "IMAGE" | "TEXT" | "HEADING"
export type Block = {
  id: string,
  entryId: string,
  blockType: BlockType,
  index?: number,
  text?: string,
  mediaSrc?: string,
}
