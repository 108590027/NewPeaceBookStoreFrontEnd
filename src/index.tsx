import React from 'react'
import ReactDOM from 'react-dom'
// Redux
// https://github.com/rt2zz/redux-persist
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import * as _redux from './setup'
import store, {persistor} from './setup/redux/Store'
import {ToastContainer} from 'react-toastify'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'

// Apps
import {App} from './app/App'
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
import 'react-toastify/dist/ReactToastify.css'
const {PUBLIC_URL} = import.meta.env

/* const mock = */ // _redux.mockAxios(axios)
_redux.setupAxios(axios, store)

Chart.register(...registerables)

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>載入中...</div>}>
        <App basename={PUBLIC_URL as string} />
        <ToastContainer position='bottom-right' autoClose={5000} />
      </PersistGate>
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById('root')
)
