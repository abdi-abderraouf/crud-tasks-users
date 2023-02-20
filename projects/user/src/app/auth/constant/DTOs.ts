export interface CompteRegister {
  password: string,
  username: string,
  confirmPassword: string,
  role: string,
  email: string
}

export interface CompteLogin{
  password: string,
  email: string,
  role: string
}
