import axios from 'axios'
import * as OrderRedux from '../redux/OrderRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {OrderModel} from '../redux/OrderModel'
import {CartType} from '../../item/redux/CartRedux'

export type Response = {
  status: number
  data: OrderModel
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/auth/createOrder`

// 取得個人單筆訂單詳細資訊
export default async function createOrderAPI(
  merchantId: number,
  items: CartType[]
): Promise<OrderModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(), {
      merchantId,
      items,
    })
    dispatch(OrderRedux.actions.updateOrders([data.data]))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
