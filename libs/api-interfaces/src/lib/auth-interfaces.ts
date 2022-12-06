export interface credentialsForm {
  email: string | null,
  password: string | null,
}

export interface verification {
  role: number,
  email: string,
  name: string,
  token: string
}
