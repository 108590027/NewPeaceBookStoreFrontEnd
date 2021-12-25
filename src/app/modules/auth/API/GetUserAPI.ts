import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {UserModel} from '../redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  user: UserModel
  totalBuyOrders: number
  totalSellOrders: number
  rate: number
}

export const API_URL = (userId: number) => `${import.meta.env.VITE_API_URL}/user/${userId}`

export default async function getUserAPI(userId: number): Promise<UserModel | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(userId))
    data.user.totalBuyOrders = data.totalBuyOrders
    data.user.totalSellOrders = data.totalSellOrders
    data.user.rate = data.rate
    dispatch(AuthRedux.actions.setUser(data.user))
    return data.user
  } catch (err: any) {
    console.log(err)
    document.location.href = '/logout'
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
