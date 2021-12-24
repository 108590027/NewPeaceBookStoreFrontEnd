import axios from 'axios'
import * as TagRedux from '../redux/TagRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {TagModel} from '../redux/TagModel'

export type Response = {
  status: number
  data: TagModel
}

export const API_URL = (key: string) => `${import.meta.env.VITE_API_URL}/tag/create`

// 新增標籤
export default async function createTagAPI(name: string): Promise<TagModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(name), {name})
    dispatch(TagRedux.actions.updateTags([data.data]))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
