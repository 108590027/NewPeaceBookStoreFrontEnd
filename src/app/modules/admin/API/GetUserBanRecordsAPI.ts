import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {BanRecordModel} from '../../auth/redux/AuthModel'

export type Response = {
  status: number
  data: BanRecordModel[]
}

export const API_URL = (userId: number) =>
  `${import.meta.env.VITE_API_URL}/admin/user/${userId}/banRecords`

export default async function getUserBanRecordsAPI(
  userId: number
): Promise<BanRecordModel[] | ErrorResponse> {
  try {
    const {data: res} = await axios.get<Response>(API_URL(userId))
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
