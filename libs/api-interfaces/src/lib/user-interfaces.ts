enum userRole {
  user,
  reviewer,
  admin
}

export interface userRegistration {
  email: string | null;
  displayName: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null ;
  age: Date | null;
}

export interface updateUserInfo {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  age: Date;
}

export interface userInfo {
  id: string;
}
