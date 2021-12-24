import {UserModel} from '../../auth/redux/AuthModel'
import {ItemModel} from '../../item/redux/ItemModel'

export type OrderModel = {
  id: number
  user_id: number
  status: number
  total_price: number
  created_at: string
  updated_at: string

  user: UserModel
  orderItems: OrderItemModel[]
  orderPayment: OrderPaymentModel
}

export type OrderItemModel = {
  id: number
  order_id: number
  item_id: number
  quantity: number
  price: number
  created_at: string
  updated_at: string

  item: ItemModel
}

export type OrderPaymentModel = {
  id: number
  order_id: number
  status: number
  type: string
  code: string
  created_at: string
  updated_at: string
}
