import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'

export type Response = {
  status: number
}

export const API_URL = (orderId: number) =>
  `${import.meta.env.VITE_API_URL}/auth/merchant/order/${orderId}/complete`

// 將商店訂單設置為已完成狀態
export default async function updateMerchantOrderCompleteAPI(
  orderId: number
): Promise<number | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(orderId))
    return data.status
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
