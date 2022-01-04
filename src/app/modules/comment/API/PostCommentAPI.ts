import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {OrderModel} from '../../order/redux/OrderModel'
import * as OrderRedux from '../../order/redux/OrderRedux'

export type Response = {
  status: number
  data: OrderModel
}

export const API_URL = (orderId: number) =>
  `${import.meta.env.VITE_API_URL}/auth/order/${orderId}/comment`

export default async function postCommentAPI(
  orderId: number,
  rate: number,
  message: string
): Promise<OrderModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(orderId), {rate, message})
    dispatch(OrderRedux.actions.updateOrders([data.data]))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
