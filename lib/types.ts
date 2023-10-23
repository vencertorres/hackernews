export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  time_ago: number;
  title: string;
  text?: string;
  type: "story" | "job";
  url: string;
  domain: string;
}

export interface Comment {
  by: string;
  id: number;
  kids: number[];
  replies: Comment[];
  text: string;
  time: number;
  time_ago: number;
  type: "comment";
  dead: boolean;
  deleted: boolean;
}

export interface User {
  about?: string;
  created: number;
  id: string;
  karma: number;
}
