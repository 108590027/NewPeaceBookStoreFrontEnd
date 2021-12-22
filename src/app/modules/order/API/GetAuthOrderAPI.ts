import axios from 'axios'
import * as OrderRedux from '../redux/OrderRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {OrderItemModel, OrderModel} from '../redux/OrderModel'

export type Response = {
  status: number
  order: OrderModel
  items: OrderItemModel[]
}

export const API_URL = (orderId: number) => `${import.meta.env.VITE_API_URL}/auth/order/${orderId}`

// 取得個人單筆訂單詳細資訊
export default async function getAuthOrderAPI(
  orderId: number
): Promise<OrderModel | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(orderId))
    data.order.items = data.items
    dispatch(OrderRedux.actions.updateOrders([data.order]))
    return data.order
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
