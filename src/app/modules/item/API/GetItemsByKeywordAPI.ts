import axios from 'axios'
// import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
// import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel[]
}

export const API_URL = (Keyword: string) =>
  `${import.meta.env.VITE_API_URL}/item/search?key=${Keyword}`

export default async function getItemsByKeywordAPI(
  Keyword: string
): Promise<ItemModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(Keyword))
    // dispatch(ItemRedux.actions.updateItems(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
