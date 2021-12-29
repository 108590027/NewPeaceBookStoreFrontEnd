import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'

export type Response = {
  status: number
  data: number
}

export const API_URL = (recordId: number) =>
  `${import.meta.env.VITE_API_URL}/admin/ban_record/${recordId}/delete`

export default async function deleteBanRecordAPI(
  recordId: number
): Promise<number | ErrorResponse> {
  try {
    const {data: res} = await axios.post<Response>(API_URL(recordId))
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
