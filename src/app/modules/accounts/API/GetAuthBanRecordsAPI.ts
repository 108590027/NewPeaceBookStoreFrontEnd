import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {BanRecordModel} from '../../auth/redux/AuthModel'

export type Response = {
  status: number
  data: BanRecordModel[]
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/auth/banRecords`

export default async function getAuthBanRecordsAPI(): Promise<BanRecordModel[] | ErrorResponse> {
  try {
    const {data: res} = await axios.get<Response>(API_URL())
    return res.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
