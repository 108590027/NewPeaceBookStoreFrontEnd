import axios from 'axios'
import * as CategoryRedux from '../redux/CategoryRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  status: number
}

export const API_URL = (id: number) => `${import.meta.env.VITE_API_URL}/category/${id}/delete`

export default async function deleteCategoryAPI(id: number): Promise<number | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(id), {})
    dispatch(CategoryRedux.actions.deleteCategory(id))
    return data.status
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
