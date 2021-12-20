import axios from 'axios'
import * as CategoryRedux from '../redux/CategoryRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {CategoryModel} from '../redux/CategoryModel'

export type Response = {
  status: number
  data: CategoryModel[]
}

export const API_URL = `${import.meta.env.VITE_API_URL}/category/list`

export default async function getCategoriesAPI(): Promise<CategoryModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL)
    dispatch(CategoryRedux.actions.setCategories(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
