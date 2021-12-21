import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {dispatch} from '../../../../setup/redux/Store'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {ItemModel} from '../../item/redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel[]
}

export const API_URL = `${import.meta.env.VITE_API_URL}/auth/recommendedItems`

export default async function getAuthRecommendItemsAPI(): Promise<ItemModel[] | ErrorResponse> {
  try {
    const {data: res} = await axios.get<Response>(API_URL)
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
