import { API_URL } from './constants'

export async function getUser(id: string) {
  const res = await fetch(`${API_URL}/user/${id}.json`)
  const data = await res.json()

  if (!data) {
    throw new Error('User not found')
  }

  return {
    ...data,
    created: new Date(data.created * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
