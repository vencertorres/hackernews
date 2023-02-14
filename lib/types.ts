export type Story = {
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  text?: string
  type: 'story' | 'job'
  url: string
  host: string
}

export type Comment = {
  by: string
  id: number
  kids: number[]
  replies: Comment[]
  text: string
  time: number
  type: 'comment'
  dead: boolean
  deleted: boolean
}

export type User = {
  about?: string
  created: number
  id: string
  karma: number
}
