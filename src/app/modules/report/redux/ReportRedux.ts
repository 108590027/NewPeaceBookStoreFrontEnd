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
  Reports: [],
  lastUpdate: 0,
}

export interface ReportState {
  Reports: ReportModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Report', whitelist: ['Reports']}, // Report存到localStorage持久化保存
  (state: ReportState = initialReportState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setReports: {
        const Reports: ReportModel[] = action.payload?.Reports
        const lastUpdate = Date.now()
        return {Reports, lastUpdate}
      }

      case actionTypes.deleteReport: {
        const id: number = action.payload?.id
        const Report = state.Reports.find((i) => i.id === id)
        if (Report) {
          state.Reports.splice(state.Reports.indexOf(Report), 1)
        }
        return {...state}
      }

      case actionTypes.updateReports: {
        const Reports: ReportModel[] = action.payload.Reports
        Reports.forEach((o) => {
          const Report = state.Reports.find((i) => i.id === o.id)
          if (Report) {
            state.Reports[state.Reports.indexOf(Report)] = {...Report}
          } else {
            state.Reports.push(o)
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
  setReports: (Reports: ReportModel[]) => ({
    type: actionTypes.setReports,
    payload: {Reports},
  }),
  deleteReport: (id: number) => ({
    type: actionTypes.deleteReport,
    payload: {id},
  }),
  updateReports: (Reports: ReportModel[]) => ({
    type: actionTypes.updateReports,
    payload: {Reports},
  }),
}

export function* saga() {}
