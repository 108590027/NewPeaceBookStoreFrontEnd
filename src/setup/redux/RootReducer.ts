import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth/redux/AuthRedux'
import * as category from '../../app/modules/category/redux/CategoryRedux'
import * as order from '../../app/modules/order/redux/OrderRedux'
import * as item from '../../app/modules/item/redux/ItemRedux'
import * as cart from '../../app/modules/item/redux/CartRedux'
import * as report from '../../app/modules/report/redux/ReportRedux'
import * as tag from '../../app/modules/tag/redux/TagRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  category: category.reducer,
  order: order.reducer,
  item: item.reducer,
  cart: cart.reducer,
  report: report.reducer,
  tag: tag.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
