export interface updateGameInfo {
  title: string;
  description: string;
  image: string;
  genre: [string];
  score: number;
  //reviews [reviews];
}

export interface gameRegistration {
  id: string | null;
  title: string;
  description: string;
  image: string;
  genre: [string];
  score: number;
}
