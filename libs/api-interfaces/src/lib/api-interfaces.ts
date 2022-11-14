export interface Message {
  message: string;
}

enum userRole {
  user,
  reviewer,
  admin
}

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: Date;
  role: userRole;
  user_score: number;
}
