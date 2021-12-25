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
  phone?: string

  phoneVerify?: PhoneVerifyModel
  comments?: CommentModel[]
}

export type CommentModel = {
  id: number
  user_id: number
  item_id: number
  rate: number
  message: string
  // created_at: string,
  // updated_at: string
}

export type PhoneVerifyModel = {
  id: number
  user_id: number
  status: number
  code: string
  created_at: string
  updated_at: string
}
