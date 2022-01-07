import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {MessageModel} from './MessageModel'

// 購物車用的Redux

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  resetChat: 'resetChat',
  updateList: 'updateList',
  initMessages: 'initMessages',
  updateChat: 'updateChat',
  newChat: 'newChat',
}

const initialChatState: ChatState = {
  chats: [],
  lastUpdate: 0,
}

export interface ChatState {
  chats: {
    userId: number
    messages: {
      fromId: number
      message: string
      time: number
    }[]
  }[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'NewPeaceBookStoreChat', whitelist: ['chats']}, // Chat存到localStorage持久化保存
  (state: ChatState = initialChatState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.resetChat: {
        return initialChatState
      }

      case actionTypes.updateList: {
        const list: number[] = action.payload?.list
        list.forEach((userId) => {
          if (!state.chats.find((c) => c.userId === userId)) {
            state.chats.push({userId: userId, messages: []})
          }
        })
        state.lastUpdate = Date.now()
        return {...state}
      }

      case actionTypes.initMessages: {
        const userId: number = action.payload?.userId
        const messages: MessageModel[] = action.payload?.messages

        if (!state.chats.find((c) => c.userId === userId)) {
          state.chats.push({userId: userId, messages: []})
        }
        const chat = state.chats.find((c) => c.userId === userId)
        if (chat) {
          chat.messages = []
          messages.forEach((message) => {
            chat.messages.push({
              fromId: message.from_user,
              message: message.message,
              time: new Date(message.created_at).getTime(),
            })
          })
        }
        state.lastUpdate = Date.now()
        return {...state}
      }
      case actionTypes.updateChat: {
        const userId: number = action.payload?.userId
        const fromId: number = action.payload?.fromId
        const message: string = action.payload?.message

        if (!state.chats.find((c) => c.userId === userId)) {
          state.chats.push({userId: userId, messages: []})
        }
        const chat = state.chats.find((c) => c.userId === userId)
        chat?.messages.push({
          fromId: fromId,
          message: message,
          time: Date.now(),
        })
        state.lastUpdate = Date.now()
        return {...state}
      }

      case actionTypes.newChat: {
        const authId: number = action.payload?.authId
        const userId: number = action.payload?.userId

        if (!state.chats.find((c) => c.userId === userId)) {
          if (userId !== authId) {
            state.chats.push({userId: userId, messages: []})
          }
        }
        state.lastUpdate = Date.now()
        return {...state}
      }

      default:
        return state
    }
  }
)

export const actions = {
  resetChat: () => ({
    type: actionTypes.resetChat,
    payload: {},
  }),
  updateList: (list: number[]) => ({
    type: actionTypes.updateList,
    payload: {list},
  }),
  initMessages: (userId: number, messages: MessageModel[]) => ({
    type: actionTypes.initMessages,
    payload: {userId, messages},
  }),
  updateChat: (userId: number, fromId: number, message: string) => ({
    type: actionTypes.updateChat,
    payload: {userId, fromId, message},
  }),
  newChat: (authId: number, userId: number) => ({
    type: actionTypes.newChat,
    payload: {authId, userId},
  }),
}

export function* saga() {}
