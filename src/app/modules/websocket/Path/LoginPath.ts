import store from '../../../../setup/redux/Store'
import Path from '../Path'

export default class LoginPath extends Path {
  type: string = 'init'

  constructor() {
    super()
    const {auth} = store.getState()
    this.form.token = auth.auth?.accessToken
    this.pushHandleFunction()
  }

  public recieveHandle(res: any) {
    console.log(`ChatRoom Init Success!`)
  }
}
