import axios from 'axios'
import * as AuthRedux from '../../auth/redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {UserModel} from '../../auth/redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  status: number
  data: UserModel
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/admin/user`

export default async function createUserAPI(
  email: string,
  name: string,
  password: string,
  sid: string,
  major: number
): Promise<UserModel | ErrorResponse> {
  try {
    const {data: res} = await axios.post<Response>(API_URL(), {
      email,
      name,
      password,
      sid,
      major,
    })
    dispatch(AuthRedux.actions.setUser(res.data))
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
