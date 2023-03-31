import { fetchItem } from './fetch-item'
import type { Comment } from './types'

export async function fetchComments(ids: number[]): Promise<Comment[]> {
  return Promise.all(
    ids.map(async (id) => {
      const comment = await fetchItem(id)
      return {
        ...comment,
        replies: await fetchComments(comment.kids || []),
      }
    })
  )
}
