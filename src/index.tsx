import React from 'react'
import ReactDOM from 'react-dom'

import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import * as _redux from './setup'
import store, {persistor} from './setup/redux/Store'
import {ToastContainer} from 'react-toastify'

import axios from 'axios'
import {Chart, registerables} from 'chart.js'

import {App} from './app/App'
import './system/assets/sass/style.scss'
import './system/assets/sass/style.react.scss'
import 'react-toastify/dist/ReactToastify.css'
const {PUBLIC_URL} = import.meta.env

/* const mock = */ // _redux.mockAxios(axios)
_redux.setupAxios(axios, store)

Chart.register(...registerables)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>載入中...</div>}>
      <App basename={PUBLIC_URL as string} />
      <ToastContainer position='bottom-right' autoClose={5000} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
