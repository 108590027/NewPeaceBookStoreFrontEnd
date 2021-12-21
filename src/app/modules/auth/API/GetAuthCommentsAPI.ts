import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {dispatch} from '../../../../setup/redux/Store'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {CommentModel} from '../redux/AuthModel'

export type Response = {
  status: number
  data: CommentModel[]
}

export const API_URL = `${import.meta.env.VITE_API_URL}/auth/comments`

export default async function getAuthCommentsAPI(): Promise<CommentModel[] | ErrorResponse> {
  try {
    const {data: res} = await axios.get<Response>(API_URL)
    dispatch(AuthRedux.actions.setAuthComments(res.data))
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
