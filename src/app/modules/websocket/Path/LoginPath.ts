import store, {dispatch} from '../../../../setup/redux/Store'
import Path from '../Path'
import * as ChatRedux from '../../chat/redux/ChatRedux'

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
    dispatch(ChatRedux.actions.updateList(res.data.list))
  }
}
