import {AxiosInstance} from 'axios'
import MockAdapter from 'axios-mock-adapter'

export default function mockAxios(axios: AxiosInstance) {
  const mock = new MockAdapter(axios, {delayResponse: 300})
  return mock
}
