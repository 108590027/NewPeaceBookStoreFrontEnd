export interface AuthModel {
  accessToken: string
  expire: number
  user: UserModel
}

export interface UserModel {
  id: number
  name: string
  // password?: string
  email: string
  // permission: string
  // verify_mail: number
}
