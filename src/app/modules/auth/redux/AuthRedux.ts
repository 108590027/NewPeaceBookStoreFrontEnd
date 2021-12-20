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
  setUser: '[setUser] Action',
  Logout: '[Logout] Action',
}
// SimpleMark: Redux預設值
const initialAuthState: IAuthState = {
  auth: undefined,
  lastUpdate: 0,
}

// SimpleMark: 此Redux結構
export interface IAuthState {
  auth?: AuthModel
  lastUpdate: number
}

// SimpleMark: 管理、保存登入中使用者狀態
export const reducer = persistReducer(
  {storage, key: 'v100-demo1-auth', whitelist: ['auth']}, // auth存到localStorage持久化保存
  (state: IAuthState = initialAuthState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setAuth: {
        const auth: AuthModel = action.payload?.auth
        const lastUpdate = Date.now()
        return {auth, lastUpdate}
      }

      case actionTypes.setToken: {
        const accessToken: string = action.payload?.accessToken
        if (!state.auth) {
          state.auth = {accessToken: accessToken, user: undefined}
        }
        state.auth.accessToken = accessToken
        state.lastUpdate = Date.now()
        return {...state}
      }

      case actionTypes.setUser: {
        const user: UserModel = action.payload?.user
        if (state.auth) {
          state.auth.user = {...user}
        }
        state.lastUpdate = Date.now()
        return {...state}
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
  setUser: (user: UserModel) => ({type: actionTypes.setUser, payload: {user}}),
  setToken: (accessToken: string) => ({type: actionTypes.setToken, payload: {accessToken}}),
  logout: () => ({type: actionTypes.Logout}),
}

export function* saga() {}
