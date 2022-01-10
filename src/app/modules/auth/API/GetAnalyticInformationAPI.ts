import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {OrderModel} from '../../order/redux/OrderModel'

export type AnalyticResponse = {
  status: number
  data: {
    rates: number[]
    buyOrders: OrderModel[]
    sellOrders: OrderModel[]
  }
}

export const API_URL = `${import.meta.env.VITE_API_URL}/auth/analytic`

export default async function getAnalyticInformationAPI(): Promise<
  AnalyticResponse | ErrorResponse
> {
  try {
    const {data} = await axios.get<AnalyticResponse>(API_URL)
    return data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
