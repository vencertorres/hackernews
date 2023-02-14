export type Story = {
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: 'story' | 'job'
  url: string
  host: string
}
