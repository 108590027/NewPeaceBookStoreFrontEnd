import axios from 'axios'
import {BanRecordModel} from '../../auth/redux/AuthModel'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'

export type Response = {
  status: number
  data: BanRecordModel
}

export const API_URL = (userId: number) =>
  `${import.meta.env.VITE_API_URL}/admin/user/${userId}/ban`

export default async function createBanRecordAPI(
  userId: number,
  reason: string,
  duration: number
): Promise<BanRecordModel | ErrorResponse> {
  try {
    const {data: res} = await axios.post<Response>(API_URL(userId), {reason, duration})
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
