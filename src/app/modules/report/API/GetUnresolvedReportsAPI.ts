import axios from 'axios'
import * as ReportRedux from '../redux/ReportRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {dispatch} from '../../../../setup/redux/Store'
import {ReportModel} from '../redux/ReportModel'

export type Response = {
  status: number
  data: ReportModel[]
}

export const API_URL = () => `${import.meta.env.VITE_API_URL}/auth/report/unresolves`

// 取得所有未處理的舉報資訊
export default async function getUnresolvedReportsAPI(): Promise<ReportModel[] | ErrorResponse> {
  try {
    const {data} = await axios.get<Response>(API_URL())
    dispatch(ReportRedux.actions.updateReports(data.data))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
