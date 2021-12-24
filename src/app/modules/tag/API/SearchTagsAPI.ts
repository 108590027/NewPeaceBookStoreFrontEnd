import axios from 'axios'
import * as TagRedux from '../redux/TagRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {TagModel} from '../redux/TagModel'

export type Response = {
  status: number
  data: TagModel[]
}

export const API_URL = (key: string) => `${import.meta.env.VITE_API_URL}/tag/search?text=${key}`

// 搜尋標籤
export default async function searchTagsAPI(key: string): Promise<TagModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL(key))
    dispatch(TagRedux.actions.updateTags(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
