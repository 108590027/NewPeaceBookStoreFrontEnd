import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'

export type Response = {
  status: number
}

export const API_URL = (userId: number) => `${import.meta.env.VITE_API_URL}/user/${userId}/report`

// 提交舉報
export default async function createReportAPI(
  userId: number,
  reason: number,
  detail: string
): Promise<number | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(userId), {reason, detail})
    return data.status
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
