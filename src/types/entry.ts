type InteractionCount = {
  likes?: number,
  comments?: number,
}
export type Entry = {
  authorId: string,
  id: string,
  title: string,
  createdAt: Date,
  publishedAt?: Date,
  _count?: InteractionCount,
}
