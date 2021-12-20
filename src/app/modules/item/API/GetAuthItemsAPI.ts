import axios from 'axios'
import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel[]
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/auth/items`

export default async function getAuthItemsAPI(): Promise<ItemModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL())
    dispatch(ItemRedux.actions.updateItems(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
