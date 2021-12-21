import axios from 'axios'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'

export type Response = {
  status: number
}

export const API_URL = `${import.meta.env.VITE_API_URL}/auth/bindPhone`

export default async function bindPhoneAPI(phone: string): Promise<number | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL, {phone})
    return data.status
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
