import { getData } from './get-data'
import type { Comment } from './types'

export async function getComments(ids: number[]): Promise<Comment[]> {
  return Promise.all(
    ids.map(async (id) => {
      const comment = await getData(id)
      return {
        ...comment,
        replies: await getComments(comment.kids || []),
      }
    })
  )
}
