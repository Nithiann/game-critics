export interface Review {
  _id: string;
  user_ref: string;
  description: string;
  created_at: Date;
  modified_at: Date|null;
  game_score: number;
  review_score: number;
  comments: [Comment]|null;
}

export interface Comment {
  _id: string;
  user_ref: string;
  description: string;
  created_at: Date;
  modified_at: Date;
}

export interface Game {
  _id: string;
  title: string;
  description: string;
  image: string;
  genre: [string];
  score: number;
  reviews: [Review]|null;
}
