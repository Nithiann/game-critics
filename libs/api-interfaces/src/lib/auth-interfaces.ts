import { userInfo } from "./user-interfaces"

export interface credentialsForm {
  email: string | null,
  password: string | null,
}

export interface verification{
  role: number,
  name: string,
  _id: string,
}

export interface UserIdentity {
  id: string
  email: string
}

export interface Token {
  token: string
}
