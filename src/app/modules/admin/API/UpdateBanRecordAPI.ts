import axios from 'axios'
import {BanRecordModel} from '../../auth/redux/AuthModel'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'

export type Response = {
  status: number
  data: BanRecordModel
}

export const API_URL = (recordId: number) =>
  `${import.meta.env.VITE_API_URL}/admin/ban_record/${recordId}/update`

export default async function updateBanRecordAPI(
  recordId: number,
  reason: string,
  duration: number
): Promise<BanRecordModel | ErrorResponse> {
  try {
    const {data: res} = await axios.post<Response>(API_URL(recordId), {reason, duration})
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
