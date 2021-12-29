import axios from 'axios'
import * as CategoryRedux from '../redux/CategoryRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {CategoryModel} from '../redux/CategoryModel'

export type Response = {
  status: number
  data: CategoryModel
}

export const API_URL = (categoryId: number) =>
  `${import.meta.env.VITE_API_URL}/category/${categoryId}/update`

export default async function updateCategoryAPI(
  categoryId: number,
  name: string,
  is_department: boolean
): Promise<CategoryModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(categoryId), {name, is_department})
    dispatch(CategoryRedux.actions.updateCategory(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
