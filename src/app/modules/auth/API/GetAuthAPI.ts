import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {UserModel} from '../redux/AuthModel'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = UserModel

export const API_URL = `${import.meta.env.VITE_API_URL}/auth`

export default async function getAuthAPI(): Promise<UserModel | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL)
    dispatch(AuthRedux.actions.setUser(data))
    return data
  } catch (err: any) {
    console.log(err)
    document.location.href = '/logout'
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
