export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      const {auth} = store.getState()

      if (auth?.auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.auth.accessToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}
