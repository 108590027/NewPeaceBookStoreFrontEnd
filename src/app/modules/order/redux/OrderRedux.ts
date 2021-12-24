import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {OrderModel} from './OrderModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  setOrders: 'setOrders',
  deleteOrder: 'deleteOrder',
  updateOrders: 'updateOrders',
}

const initialOrderState: OrderState = {
  orders: [],
  lastUpdate: 0,
}

export interface OrderState {
  orders: OrderModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Order', whitelist: ['orders']}, // Order存到localStorage持久化保存
  (state: OrderState = initialOrderState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setOrders: {
        const orders: OrderModel[] = action.payload?.orders
        const lastUpdate = Date.now()
        return {orders, lastUpdate}
      }

      case actionTypes.deleteOrder: {
        const id: number = action.payload?.id
        const order = state.orders.find((i) => i.id === id)
        if (order) {
          state.orders.splice(state.orders.indexOf(order), 1)
        }
        return {...state}
      }

      case actionTypes.updateOrders: {
        const orders: OrderModel[] = action.payload.orders
        orders.forEach((o) => {
          const order = state.orders.find((i) => i.id === o.id)
          if (order) {
            state.orders[state.orders.indexOf(order)] = {...order}
          } else {
            state.orders.push(o)
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
  setOrders: (orders: OrderModel[]) => ({
    type: actionTypes.setOrders,
    payload: {orders},
  }),
  deleteOrder: (id: number) => ({
    type: actionTypes.deleteOrder,
    payload: {id},
  }),
  updateOrders: (orders: OrderModel[]) => ({
    type: actionTypes.updateOrders,
    payload: {orders},
  }),
}

export function* saga() {}
