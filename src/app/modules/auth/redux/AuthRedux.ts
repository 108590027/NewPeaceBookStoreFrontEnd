import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {AuthModel, CommentModel, UserModel} from './AuthModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  setAuth: 'setAuth',
  setToken: 'setToken',
  setUser: 'setUser',
  setUsers: 'setUsers',
  setAuthComments: 'setAuthComments',
  Logout: 'Logout',
}
// SimpleMark: Redux預設值
const initialAuthState: IAuthState = {
  auth: undefined,
  users: [],
  lastUpdate: 0,
}

// SimpleMark: 此Redux結構
export interface IAuthState {
  auth?: AuthModel
  users: UserModel[]
  lastUpdate: number
}

// SimpleMark: 管理、保存登入中使用者狀態
export const reducer = persistReducer(
  {storage, key: 'v100-demo1-auth', whitelist: ['auth']}, // auth存到localStorage持久化保存
  (state: IAuthState = initialAuthState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setAuth: {
        const auth: AuthModel = action.payload?.auth
        state.auth = auth
        state.lastUpdate = Date.now()
        return {...state}
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
        if (state.auth?.user?.id === user.id) {
          state.auth.user = {...user}
        }
        const oriUser = state.users.find((i) => i.id === user.id)
        if (oriUser) {
          state.users[state.users.indexOf(oriUser)] = {...user}
        } else {
          state.users.push(user)
        }
        state.lastUpdate = Date.now()
        return {...state}
      }

      case actionTypes.setUsers: {
        const users: UserModel[] = action.payload?.users
        users.forEach((user) => {
          if (state.auth?.user?.id === user.id) {
            state.auth.user = {...user}
          }
          const oriUser = state.users.find((i) => i.id === user.id)
          if (oriUser) {
            state.users[state.users.indexOf(oriUser)] = {...user}
          } else {
            state.users.push(user)
          }
        })
        return {...state}
      }

      case actionTypes.setAuthComments: {
        const comments: CommentModel[] = action.payload.comments
        if (state.auth?.user) {
          state.auth.user.comments = comments
          const user = state.users.find((u) => u.id === state.auth?.user?.id)
          if (user) {
            user.comments = comments
          }
        }
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
  setUsers: (users: UserModel[]) => ({type: actionTypes.setUsers, payload: {users}}),
  setAuthComments: (comments: CommentModel[]) => ({
    type: actionTypes.setAuthComments,
    payload: {comments},
  }),
  setToken: (accessToken: string) => ({type: actionTypes.setToken, payload: {accessToken}}),
  logout: () => ({type: actionTypes.Logout}),
}

export function* saga() {}
