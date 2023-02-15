import { format } from 'timeago.js'
import { API_URL } from './constants'

export async function fetchItem(id: number) {
  const res = await fetch(`${API_URL}/item/${id}.json`)
  const item = await res.json()

  if (!item) {
    throw new Error('Item not found')
  }

  return {
    ...item,
    time: format(item.time * 1000),
    host: item.url ? new URL(item.url).host.replace(/^www\./, '') : '',
  }
}
