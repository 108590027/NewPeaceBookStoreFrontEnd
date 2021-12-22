import axios from 'axios'
import * as OrderRedux from '../redux/OrderRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {OrderModel} from '../redux/OrderModel'

export type Response = {
  status: number
  data: OrderModel[]
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/auth/merchant/orders`

// 取得商店訂單
export default async function getMerchantOrdersAPI(): Promise<OrderModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL())
    dispatch(OrderRedux.actions.updateOrders(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
