export interface AuthModel {
  accessToken: string
  user?: UserModel
}

export interface UserModel {
  id: number
  name: string
  role: number
  email: string
  sid: string
  major: number
}
