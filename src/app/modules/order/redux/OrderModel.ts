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
