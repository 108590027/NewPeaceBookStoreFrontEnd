import axios from 'axios'
import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/item/create`

export default async function createItemAPI(
  name: string,
  description: string,
  ISBN: string,
  category: number,
  price: number,
  quantity: number,
  images: string[],
  tags: string[]
): Promise<ItemModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(), {
      name,
      description,
      ISBN,
      category,
      price,
      quantity,
      images: JSON.stringify(images),
      tags: JSON.stringify(tags),
    })
    dispatch(ItemRedux.actions.setItem(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
