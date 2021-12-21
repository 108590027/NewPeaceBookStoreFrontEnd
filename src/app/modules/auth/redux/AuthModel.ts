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
