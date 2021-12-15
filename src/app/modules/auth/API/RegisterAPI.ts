import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {AuthModel, UserModel} from '../redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

type Response = {
  status: boolean
  token: string
  user: UserModel
}

const API_URL = `${import.meta.env.VITE_API_URL}/auth/register`

export default async function registerAPI(
  email: string,
  password: string,
  name: string,
  sid: string,
  major: number
): Promise<AuthModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL, {email, password, name, sid, major})
    const auth: AuthModel = {
      accessToken: data.token,
      user: data.user,
    }
    dispatch(AuthRedux.actions.setAuth(auth))
    return auth
  } catch (err: any) {
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
