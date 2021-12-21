import axios from 'axios'
// import * as ItemRedux from '../redux/ItemRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
// import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel[]
}

export const API_URL = (ISBN: string) =>
  `${import.meta.env.VITE_API_URL}/item/searchISBN?ISBN=${ISBN}`

export default async function getItemsByISBNAPI(
  ISBN: string
): Promise<ItemModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(ISBN))
    // dispatch(ItemRedux.actions.updateItems(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
