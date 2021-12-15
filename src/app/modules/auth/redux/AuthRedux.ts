import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {AuthModel, UserModel} from './AuthModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  setAuth: '[setAuth] Action',
  setToken: '[setToken] Action',
  Logout: '[Logout] Action',
}
// SimpleMark: Redux預設值
const initialAuthState: IAuthState = {
  auth: undefined,
}

// SimpleMark: 此Redux結構
export interface IAuthState {
  auth?: AuthModel
}

export function getAuthByToken(accessToken: string) {
  const data = JSON.parse(atob(accessToken.split('.')[1]))
  const auth: AuthModel = {
    accessToken: accessToken,
    expire: data.exp,
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
    },
  }
  return auth
}

// SimpleMark: 管理、保存登入中使用者狀態
export const reducer = persistReducer(
  {storage, key: 'v100-demo1-auth', whitelist: ['auth']}, // auth存到localStorage持久化保存
  (state: IAuthState = initialAuthState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setAuth: {
        const auth: AuthModel = action.payload?.auth
        return {auth}
      }

      case actionTypes.setToken: {
        const accessToken: string = action.payload?.accessToken
        const auth = getAuthByToken(accessToken)
        return {auth}
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      default:
        return state
    }
  }
)

export const actions = {
  setAuth: (auth: AuthModel) => ({type: actionTypes.setAuth, payload: {auth}}),
  setToken: (accessToken: string) => ({type: actionTypes.setToken, payload: {accessToken}}),
  logout: () => ({type: actionTypes.Logout}),
}

export function* saga() {}
