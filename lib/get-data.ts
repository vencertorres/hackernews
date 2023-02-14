import { format } from 'timeago.js'
import { API_URL } from './constants'

export async function getData(id: number) {
  const res = await fetch(`${API_URL}/item/${id}.json`)
  const data = await res.json()

  if (!data) {
    throw new Error('Item not found')
  }

  return {
    ...data,
    time: format(data.time * 1000),
    host: data.url ? new URL(data.url).host.replace(/^www\./, '') : '',
  }
}
