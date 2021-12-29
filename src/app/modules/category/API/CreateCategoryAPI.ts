import axios from 'axios'
import * as CategoryRedux from '../redux/CategoryRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {CategoryModel} from '../redux/CategoryModel'

export type Response = {
  status: number
  data: CategoryModel
}

export const API_URL = `${import.meta.env.VITE_API_URL}/category/create`

export default async function createCategoryAPI(
  name: string,
  is_department: boolean
): Promise<CategoryModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL, {name, is_department})
    dispatch(CategoryRedux.actions.createCategory(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
