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

export interface updateUserInfo {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  age: Date;
}
