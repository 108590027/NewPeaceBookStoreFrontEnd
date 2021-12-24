import axios from 'axios'
import * as TagRedux from '../redux/TagRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  status: number
}

export const API_URL = (tagId: number) => `${import.meta.env.VITE_API_URL}/tag/${tagId}/delete`

// 新增標籤
export default async function deleteTagAPI(tagId: number): Promise<number | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(tagId))
    dispatch(TagRedux.actions.deleteTag(tagId))
    return data.status
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
