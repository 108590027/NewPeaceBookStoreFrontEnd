import axios from 'axios'
import * as AuthRedux from '../../auth/redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {UserModel} from '../../auth/redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  status: number
  data: UserModel[]
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/admin/user`

export default async function getUsersAPI(): Promise<UserModel[] | ErrorResponse> {
  try {
    const {data: res} = await axios.get<Response>(API_URL())
    dispatch(AuthRedux.actions.setUsers(res.data))
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
