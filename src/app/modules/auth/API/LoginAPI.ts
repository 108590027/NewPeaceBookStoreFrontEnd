import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {AuthModel} from '../redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

export type LoginResponse = {
  status: boolean
  token: string
}

export const API_URL = `${import.meta.env.VITE_API_URL}/login`

export default async function loginAPI(
  email: string,
  password: string
): Promise<AuthModel | ErrorResponse> {
  try {
    const {data} = await axios.post<LoginResponse>(API_URL, {email, password})
    const auth = AuthRedux.getAuthByToken(data.token)
    dispatch(AuthRedux.actions.setAuth(auth))
    return auth
  } catch (err: any) {
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
