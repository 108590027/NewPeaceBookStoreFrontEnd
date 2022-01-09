import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import * as CartRedux from '../../item/redux/CartRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {AuthModel, UserModel} from '../redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

export type LoginResponse = {
  status: boolean
  token: string
  user: UserModel
}

export const API_URL = `${import.meta.env.VITE_API_URL}/auth/login`

export default async function loginAPI(
  email: string,
  password: string
): Promise<AuthModel | ErrorResponse> {
  try {
    const {data} = await axios.post<LoginResponse>(API_URL, {email, password})
    const auth: AuthModel = {
      accessToken: data.token,
      user: data.user,
    }
    dispatch(AuthRedux.actions.setAuth(auth))
    dispatch(CartRedux.actions.updateUser(auth.user?.id as number))
    return auth
  } catch (err: any) {
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
