import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth/redux/AuthRedux'
import * as category from '../../app/modules/category/redux/CategoryRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  category: category.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
