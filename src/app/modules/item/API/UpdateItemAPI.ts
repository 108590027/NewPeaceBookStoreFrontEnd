import axios from 'axios'
import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel
}

export const API_URL = (itemId: number) => `${import.meta.env.VITE_API_URL}/item/${itemId}/update`

export default async function updateItemAPI(
  itemId: number,
  name: string,
  description: string,
  ISBN: string,
  category: number,
  price: number,
  quantity: number
): Promise<ItemModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(itemId), {
      name,
      description,
      ISBN,
      category,
      price,
      quantity,
    })
    dispatch(ItemRedux.actions.updateItems([data.data]))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
