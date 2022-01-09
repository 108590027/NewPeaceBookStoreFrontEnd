import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 購物車用的Redux

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  resetCart: 'resetCart',
  updateUser: 'updateUser',
  deleteCartItem: 'deleteCartItem',
  updateCartItem: 'updateCartItem',
}

const initialCartState: CartState = {
  Carts: [],
  userId: 0,
  lastUpdate: 0,
}

export type CartType = {itemId: number; quantity: number}

export interface CartState {
  Carts: CartType[]
  userId: number
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'NewPeaceBookStoreCart'}, // Cart存到localStorage持久化保存
  (state: CartState = initialCartState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.resetCart: {
        return initialCartState
      }

      case actionTypes.deleteCartItem: {
        const itemId: number = action.payload?.itemId
        const item = state.Carts.find((i) => i.itemId === itemId)
        if (item) {
          state.Carts.splice(state.Carts.indexOf(item), 1)
        }
        const lastUpdate = Date.now()
        const Carts = [...state.Carts]
        return {lastUpdate, Carts, userId: state.userId}
      }

      case actionTypes.updateCartItem: {
        const itemId: number = action.payload?.itemId
        const quantity: number = action.payload?.quantity
        const item = state.Carts.find((i) => i.itemId === itemId)
        if (item) {
          state.Carts[state.Carts.indexOf(item)] = {itemId, quantity}
        } else {
          state.Carts.push({itemId, quantity})
        }
        const lastUpdate = Date.now()
        const Carts = state.Carts
        return {lastUpdate, Carts: [...Carts], userId: state.userId}
      }

      case actionTypes.updateUser: {
        const userId: number = action.payload?.userId
        if (state.userId !== userId) {
          return initialCartState
        }
        return {...state}
      }

      default:
        return state
    }
  }
)

export const actions = {
  resetCart: () => ({
    type: actionTypes.resetCart,
    payload: {},
  }),
  deleteCartItem: (itemId: number) => ({
    type: actionTypes.deleteCartItem,
    payload: {itemId},
  }),
  updateCartItem: (itemId: number, quantity: number) => ({
    type: actionTypes.updateCartItem,
    payload: {itemId, quantity},
  }),
  updateUser: (userId: number) => ({
    type: actionTypes.updateUser,
    payload: {userId},
  }),
}

export function* saga() {}
