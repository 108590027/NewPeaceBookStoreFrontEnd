import axios from 'axios'
import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel
}

export const API_URL = (id: number) => `${import.meta.env.VITE_API_URL}/item/${id}`

export default async function getItemAPI(id: number): Promise<ItemModel | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(id))
    dispatch(ItemRedux.actions.setItem(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
