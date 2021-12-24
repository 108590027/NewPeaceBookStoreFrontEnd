import axios from 'axios'
import * as ReportRedux from '../redux/ReportRedux'
import {ErrorResponse, NetworkErrorResponse} from '../../errors/ErrorDataTypes'
import {ReportModel} from '../redux/ReportModel'
import {dispatch} from '../../../../setup/redux/Store'

export type Response = {
  status: number
  data: ReportModel
}

export const API_URL = (reportId: number) =>
  `${import.meta.env.VITE_API_URL}/report/${reportId}/resolve`

// 提交舉報
export default async function resolveReportAPI(
  reportId: number,
  time: number
): Promise<ReportModel | ErrorResponse> {
  try {
    const {data} = await axios.post<Response>(API_URL(reportId), {time})
    dispatch(ReportRedux.actions.updateReports([data.data]))
    return data.data
  } catch (err: any) {
    console.log(err)
    return (err.response?.data as ErrorResponse) || NetworkErrorResponse
  }
}
