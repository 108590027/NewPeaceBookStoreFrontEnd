import axios from 'axios'
import * as CategoryRedux from '../redux/CategoryRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {CategoryModel} from '../redux/CategoryModel'
import {ItemModel} from '../../item/redux/ItemModel'

export type Response = {
  status: number
  data: ItemModel[]
}

export const API_URL = (id: number) => `${import.meta.env.VITE_API_URL}/category/${id}/items`

export default async function getCategoryItemsAPI(
  id: number
): Promise<ItemModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(id))
    dispatch(CategoryRedux.actions.setCategoryItems(id, data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
