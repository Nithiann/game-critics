export interface Message {
  message: string;
}

enum userRole {
  user,
  reviewer,
  admin
}

export interface userRegistration {
  email: string;
  displayName: string;
  password: string;
  firstName: string;
  lastName: string;
  age: Date;
}

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
