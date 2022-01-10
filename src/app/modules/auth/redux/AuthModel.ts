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

  totalBuyOrders?: number
  totalSellOrders?: number
  rate?: number

  phone_verify?: PhoneVerifyModel
  comments?: CommentModel[]
}

export type CommentModel = {
  id: number
  user_id: number
  merchant_id: number
  rate: number
  message: string
  created_at: string,
  updated_at: string
}

export type PhoneVerifyModel = {
  id: number
  user_id: number
  status: number
  code: string
  created_at: string
  updated_at: string
}

export type BanRecordModel = {
  id: number
  user_id: number
  reason: string
  duration: string
  created_at: string
  updated_at: string
}
