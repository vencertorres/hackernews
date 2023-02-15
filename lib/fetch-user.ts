import { API_URL } from './constants'
import type { User } from './types'

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${API_URL}/user/${id}.json`)
  const user = await res.json()

  if (!user) {
    throw new Error('User not found')
  }

  return {
    ...user,
    created: new Date(user.created * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
