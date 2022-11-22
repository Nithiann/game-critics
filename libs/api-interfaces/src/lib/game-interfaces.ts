export interface updateGameInfo {
  title: string;
  description: string;
  image: string;
  genre: [string];
  score: number;
  //reviews [reviews];
}

export interface gameRegistration {
  _id: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  genre: string[] | null;
  score: number | null;
}
