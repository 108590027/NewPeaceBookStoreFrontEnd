import axios from 'axios'
// import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
// import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel[]
}

export const API_URL = (tagId: number) => `${import.meta.env.VITE_API_URL}/tag/${tagId}/items`

export default async function getItemsByTagAPI(
  tagId: number
): Promise<ItemModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(tagId))
    // dispatch(ItemRedux.actions.updateItems(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
