import { API_URL, lists } from './constants'
import { fetchItem } from './fetch-item'

export async function fetchStories(list: string, page: number) {
  const res = await fetch(`${API_URL}/${lists[list]}.json`)
  const ids = (await res.json()) as number[]

  const start = (page - 1) * 30
  const stories = Promise.all(ids.slice(start, start + 30).map(fetchItem))
  return stories
}
