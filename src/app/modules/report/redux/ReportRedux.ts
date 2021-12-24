import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {ReportModel} from './ReportModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  setReports: 'setReports',
  deleteReport: 'deleteReport',
  updateReports: 'updateReports',
}

const initialReportState: ReportState = {
  reports: [],
  lastUpdate: 0,
}

export interface ReportState {
  reports: ReportModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Report', whitelist: ['reports']}, // Report存到localStorage持久化保存
  (state: ReportState = initialReportState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setReports: {
        const reports: ReportModel[] = action.payload?.reports
        const lastUpdate = Date.now()
        return {reports, lastUpdate}
      }

      case actionTypes.deleteReport: {
        const id: number = action.payload?.id
        const report = state.reports.find((i) => i.id === id)
        if (report) {
          state.reports.splice(state.reports.indexOf(report), 1)
        }
        return {...state}
      }

      case actionTypes.updateReports: {
        const reports: ReportModel[] = action.payload.Reports
        reports.forEach((o) => {
          const report = state.reports.find((i) => i.id === o.id)
          if (report) {
            state.reports[state.reports.indexOf(report)] = {...report}
          } else {
            state.reports.push(o)
          }
        })
        return {...state}
      }

      default:
        return state
    }
  }
)

export const actions = {
  setReports: (reports: ReportModel[]) => ({
    type: actionTypes.setReports,
    payload: {reports},
  }),
  deleteReport: (id: number) => ({
    type: actionTypes.deleteReport,
    payload: {id},
  }),
  updateReports: (reports: ReportModel[]) => ({
    type: actionTypes.updateReports,
    payload: {reports},
  }),
}

export function* saga() {}
