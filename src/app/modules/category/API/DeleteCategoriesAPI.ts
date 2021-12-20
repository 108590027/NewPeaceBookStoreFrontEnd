import axios from 'axios'
import * as CategoryRedux from '../redux/CategoryRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {CategoryModel} from '../redux/CategoryModel'

export type Response = {
  status: number
  data: CategoryModel
}

export const API_URL = (id: number) => `${import.meta.env.VITE_API_URL}/category/${id}/delete`

export default async function deleteCategoriesAPI(id: number): Promise<number | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(id), {})
    dispatch(CategoryRedux.actions.deleteCategory(id))
    return id
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
