import axios from 'axios'
import * as AuthRedux from '../redux/AuthRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {CommentModel} from '../redux/AuthModel'
import store, {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  statuse: number
  data: CommentModel[]
}

export const API_URL = (userId: number) =>
  `${import.meta.env.VITE_API_URL}/user/${userId}/merchant_comments`

export default async function getMerchantCommentsAPI(
  userId: number
): Promise<CommentModel[] | ErrorResponse> {
  try {
    const {data: res} = await axios.get<Response>(API_URL(userId))
    const user = store.getState().auth.users.find((u) => u.id === userId)
    if (user) {
      user.comments = res.data
      dispatch(AuthRedux.actions.setAuthComments(res.data))
    }
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
