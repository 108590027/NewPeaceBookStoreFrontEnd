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
  Orders: [],
  lastUpdate: 0,
}

export interface OrderState {
  Orders: OrderModel[]
  lastUpdate: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-Order', whitelist: ['Orders']}, // Order存到localStorage持久化保存
  (state: OrderState = initialOrderState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.setOrders: {
        const Orders: OrderModel[] = action.payload?.Orders
        const lastUpdate = Date.now()
        return {Orders, lastUpdate}
      }

      case actionTypes.deleteOrder: {
        const id: number = action.payload?.id
        const Order = state.Orders.find((i) => i.id === id)
        if (Order) {
          state.Orders.splice(state.Orders.indexOf(Order), 1)
        }
        return {...state}
      }

      case actionTypes.updateOrders: {
        const Orders: OrderModel[] = action.payload.Orders
        Orders.forEach((o) => {
          const order = state.Orders.find((i) => i.id === o.id)
          if (order) {
            state.Orders[state.Orders.indexOf(order)] = {...order}
          } else {
            state.Orders.push(o)
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
  setOrders: (Orders: OrderModel[]) => ({
    type: actionTypes.setOrders,
    payload: {Orders},
  }),
  deleteOrder: (id: number) => ({
    type: actionTypes.deleteOrder,
    payload: {id},
  }),
  updateOrders: (Orders: OrderModel[]) => ({
    type: actionTypes.updateOrders,
    payload: {Orders},
  }),
}

export function* saga() {}
