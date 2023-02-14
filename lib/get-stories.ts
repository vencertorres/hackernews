import { API_URL, lists } from './constants'
import { getData } from './get-data'

export async function getStories(list: string, page: number) {
  if (!lists[list] || !page) return undefined

  const res = await fetch(`${API_URL}/${lists[list]}.json`)
  const ids = (await res.json()) as number[]

  const start = (page - 1) * 30
  const stories = Promise.all(ids.slice(start, start + 30).map(getData))
  return stories
}
