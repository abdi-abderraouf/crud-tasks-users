export interface Login{
    email: string,
    password: string,
    role: string
  }

  export interface Register{
    firstName:string,
    lastName:string,
    username:string,
    email: string,
    password: string,
    role: string
  }
export interface LoginResponse{
  token:string;
  userId:string;
}
